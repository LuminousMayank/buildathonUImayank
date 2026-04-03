import os
import json
import re
import urllib.request
import asyncio
import pdfplumber
import io
from models.portfolio_schema import PortfolioSchema


MAX_RESUME_CHARS = 15000  # Safety cap for LLM context


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF using pdfplumber (server-side, robust)."""
    text_parts = []
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text)
    return "\n".join(text_parts)


def cleanse_text(raw: str) -> str:
    """
    Clean and normalize resume text before sending to LLM.
    Prevents token-limit issues and garbage input.
    """
    # Collapse multiple whitespace/newlines
    text = re.sub(r'\n{3,}', '\n\n', raw)
    text = re.sub(r'[ \t]{2,}', ' ', text)
    # Strip non-printable characters
    text = re.sub(r'[^\x20-\x7E\n\r\t]', '', text)
    # Truncate to safe limit
    if len(text) > MAX_RESUME_CHARS:
        text = text[:MAX_RESUME_CHARS] + "\n\n[TRUNCATED — remaining content omitted]"
    return text.strip()


TRANSFORMATION_PROMPT = """You are a Portfolio Compiler — an editorial engine that transforms raw resume text into curated portfolio data.

## YOUR JOB
You are NOT copying the resume. You are TRANSFORMING it.

A portfolio is NOT a resume. A portfolio is:
- Project-centric (projects are the main focus)
- Impact-driven (metrics > descriptions)
- Curated (3-5 best things, not everything)
- Personal (first person, conversational tone)
- Compressed (short, punchy, no walls of text)

## TRANSFORMATION RULES

### headline
Write a punchy 1-line tagline — NOT the job title.
BAD: "Software Engineer at Google"
GOOD: "I build tools that make developers' lives easier."
GOOD: "Full-stack engineer obsessed with great user experiences."

### about
Write 2-3 sentences in first person. Warm, personal, conversational.
BAD: "Results-driven professional with 5+ years of experience in..."
GOOD: "I'm a frontend engineer who cares deeply about accessibility and clean code. Currently building design systems at Klaviyo."

### featured_projects
Extract the TOP 3-5 most impressive projects. For each:
- Write a clean one_liner (max 20 words, what it IS and what it DOES)
- Extract a key metric if available (e.g. "100k+ users", "40% faster")
- List only 3-5 core technologies
If the resume has no explicit projects, infer them from work experience.

### experience
For each role, write ONE impact line (max 25 words).
BAD: Copy-pasting all bullet points
GOOD: "Led the dashboard redesign, cutting page load times by 40% for 2M daily users."
Keep only 3-5 core tech items per role.

### skills
Group into 3-5 categories (Languages, Frameworks, Tools, etc.)
Limit to the most relevant items. Do not list everything.

## OUTPUT
Return ONLY valid JSON conforming to the provided schema.
No markdown, no commentary, no extra text.

## SCHEMA
{schema}
"""


async def parse_resume_to_portfolio(resume_text: str) -> dict:
    """
    Transforms raw resume text into curated portfolio JSON via LLM.
    """
    api_key = os.getenv("LLM_API_KEY")
    if not api_key:
        print("Warning: LLM_API_KEY not found. Returning empty dict.")
        return {}

    # Cleanse the text
    clean_text = cleanse_text(resume_text)
    if len(clean_text) < 30:
        return {"error": "Not enough text extracted from the resume."}

    # Get schema for the prompt
    schema_json = json.dumps(PortfolioSchema.model_json_schema(), indent=2)
    system_prompt = TRANSFORMATION_PROMPT.format(schema=schema_json)

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Transform this resume into portfolio data:\n\n{clean_text}"}
        ],
        "temperature": 0.3,
        "max_tokens": 4096,
        "response_format": {"type": "json_object"}
    }

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
        method="POST"
    )

    def fetch_api():
        try:
            with urllib.request.urlopen(req, timeout=30.0) as response:
                result = json.loads(response.read().decode("utf-8"))
                content = result["choices"][0]["message"]["content"]
                return json.loads(content)
        except Exception as e:
            print(f"LLM API Error during resume transformation: {e}")
            return {"error": str(e)}

    return await asyncio.to_thread(fetch_api)
