import os
import json
import urllib.request
import asyncio

async def generate_marketing_copy(prompt: str, layout_mode: str, sections: list) -> dict:
    api_key = os.getenv("LLM_API_KEY")
    if not api_key:
        print("Warning: LLM_API_KEY not found. Returning empty dict.")
        return {}

    sections_str = ", ".join(sections)
    system_prompt = f"""You are a marketing copy generator.

Return STRICT JSON only.
Do not include markdown.
Do not explain.
Do not include commentary.

Match structure exactly.

Tone rules:
    • fintech -> trustworthy, data-driven
    • creative -> expressive, immersive
    • dashboard -> analytical, concise
    • landing -> persuasive, benefit-focused

Sections provided: {sections_str}

User intent: "{prompt}"

Generate high-quality microcopy.

Required JSON Structure (Example for guidance):
{{
  "hero": {{ "heading": "", "subheading": "", "cta": "" }},
  "fullscreenHero": {{ "heading": "", "subheading": "", "cta": "" }},
  "featuresRow": [ {{ "title": "", "description": "" }} ],
  "bentoGrid": [ {{ "title": "", "subtext": "" }} ],
  "splitReveal": {{ "title": "", "description": "" }},
  "kpiTiles": [ {{ "label": "", "value": "" }} ]
}}
"""

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 800,
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
            with urllib.request.urlopen(req, timeout=7.5) as response:
                result = json.loads(response.read().decode("utf-8"))
                content = result["choices"][0]["message"]["content"]
                return json.loads(content)
        except Exception as e:
            print(f"LLM API Error: {e}")
            return {}

    return await asyncio.to_thread(fetch_api)
