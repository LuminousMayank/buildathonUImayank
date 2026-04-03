from pydantic import BaseModel, Field
from typing import List, Optional


class SocialLinks(BaseModel):
    github: Optional[str] = Field(None, description="GitHub profile URL")
    linkedin: Optional[str] = Field(None, description="LinkedIn profile URL")
    twitter: Optional[str] = Field(None, description="Twitter/X profile URL")
    website: Optional[str] = Field(None, description="Personal website URL")
    email: Optional[str] = Field(None, description="Professional email address")


class PersonalDetails(BaseModel):
    name: str = Field(..., description="Full name")
    headline: str = Field(
        ...,
        description="A punchy, curated 1-line headline. NOT the job title. "
        "Example: 'I build accessible, pixel-perfect experiences for the web.' "
        "Should feel personal and intentional, like a portfolio tagline."
    )
    location: Optional[str] = Field(None, description="City, Country")
    social_links: Optional[SocialLinks] = Field(default_factory=SocialLinks)


class FeaturedProject(BaseModel):
    """
    The most important data structure.
    Projects are the centerpiece of a portfolio. Each one must feel curated.
    """
    title: str = Field(..., description="Project name")
    one_liner: str = Field(
        ...,
        description="One sentence describing what this project IS and what it DOES. "
        "Not a bullet point. A clean, readable summary. Max 20 words."
    )
    impact: Optional[str] = Field(
        None,
        description="Key metric or achievement. E.g. '100k+ installs', '40% faster', '2M users'. "
        "If no metric exists, leave null."
    )
    tech_stack: List[str] = Field(
        default_factory=list,
        description="Technologies used. Keep to 3-5 most important."
    )
    link: Optional[str] = Field(None, description="URL to live project or repo")


class ExperienceEntry(BaseModel):
    """
    Compressed work history. NOT a resume dump.
    Focus on the role, company, and one impact-driven line.
    """
    role: str = Field(..., description="Job title")
    company: str = Field(..., description="Company name")
    period: str = Field(..., description="Date range, e.g. '2022 — Present'")
    impact_line: str = Field(
        ...,
        description="ONE sentence summarizing the biggest impact or responsibility. "
        "Must include a metric if possible. Max 25 words. "
        "Example: 'Led redesign of the dashboard, improving load times by 40%'"
    )
    tech: List[str] = Field(
        default_factory=list,
        description="Key technologies used at this role. Keep to 3-5 max."
    )


class EducationEntry(BaseModel):
    institution: str = Field(..., description="School or university name")
    degree: str = Field(..., description="Degree obtained")
    year: str = Field(..., description="Graduation year or date range")


class SkillCategory(BaseModel):
    category: str = Field(..., description="Skill group name (e.g. 'Languages', 'Frameworks')")
    items: List[str] = Field(default_factory=list, description="Skills in this category")


class PortfolioSchema(BaseModel):
    """
    The curated Portfolio Schema.
    
    This is NOT a resume transcription. The LLM must editorially transform
    resume content into portfolio-ready, curated data:
    
    - Headlines are punchy taglines, not job titles
    - About is a 2-3 sentence narrative, not an objective statement
    - Projects are the visual centerpiece with one-liners and metrics
    - Experience is compressed to role + company + one impact line
    - Skills are categorized and limited
    """
    personal: PersonalDetails
    about: str = Field(
        ...,
        description="2-3 sentence personal narrative. Written in first person. "
        "Should feel like the 'About' section of a portfolio, NOT a resume objective. "
        "Conversational, warm, shows personality. Max 60 words."
    )
    featured_projects: List[FeaturedProject] = Field(
        default_factory=list,
        description="Top 3-5 most impressive projects, curated and summarized."
    )
    experience: List[ExperienceEntry] = Field(
        default_factory=list,
        description="Work history compressed to impact-driven single lines."
    )
    education: List[EducationEntry] = Field(default_factory=list)
    skills: List[SkillCategory] = Field(default_factory=list)
