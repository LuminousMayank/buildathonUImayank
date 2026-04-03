# Resume-to-Portfolio Compiler

## 🚀 The Problem Statement
General-purpose AI UI builders attempt to generate open-ended interfaces through raw DOM hallucination, yielding inconsistent designs and broken layouts. Building a portfolio website from a resume shouldn't require complex prompt engineering or unpredictable generation loops.

## 💡 Our Solution
We pivoted from an open-ended UI compiler to a highly specialized **Resume-to-Portfolio Compiler**. This system strictly isolates data extraction, component mapping, and theme presentation to instantly generate professional, consistent, and beautiful resume websites without the risks of DOM hallucination.

Instead of writing raw JSX, our platform parses resumes into a strictly normalized JSON schema and dynamically hydrates predefined, premium React components using a unified visual theme.

---

## 🧠 Core Architecture & Logic

Our system operates under a strict, constrained compilation pipeline:

### 1. Data Extraction & Normalization
When a user uploads a resume, the system parses the document into a strict portfolio-oriented JSON schema. It intelligently extracts key details (experiences, metrics, projects, skills) and normalizes formatting without hallucinating fake experiences.

### 2. Component Mapping & Compilation
Rather than inventing arbitrary interfaces, the system maps the structured JSON data into a finite set of premium, predefined React sections (e.g., Hero, About, Skills Grid, Experience Timeline, Featured Projects).

### 3. Theme Application
The presentation layer is decoupled from the content structural layer. The system applies predefined visual themes (e.g., Dark, Light, Brutalist, Neo) to alter the presentation—determining colors, typography, spacing, and styling while preserving the underlying structured JSON data.

---

## ⚙️ Tech Stack & APIs Used

### Frontend Presentation Layer
- **Framework:** React + Vite (for fast HMR module reloading)
- **Styling Engine:** TailwindCSS (Strict tokenized utility classes enforcing a locked design system)
- **UI Components:** Reusable, theme-driven standardized portfolio components (Hero Sections, Timelines, Project Cards, Skills Tags).

### Backend Orchestrator
- **Microservices:** Python-based parsing and orchestration layer.
- **Data Structuring:** Robust NLP-based entity extraction and summarization for structured portfolio generation. 

---

## 🛠️ Key Execution Features

1. **Structured Data JSON:** Every generated portfolio is backed by a clean, standardized JSON representation of the user's professional profile.
2. **Zero-Hallucination Design:** By assembling predefined React components, the UI layout is mathematically guaranteed to be responsive and structurally sound.
3. **Theme Separation:** The visual aesthetic (theme) is completely separate from the content structure, allowing users to swap looks across Brutalist, Minimal, or Dark modes seamlessly.
4. **Intelligent Normalization:** Bullet points are summarized into actionable highlights, generic skills are grouped logically, and raw metrics are highlighted.

---

## 🔮 Future Improvements
1. **Dynamic Keyword Targeting:** Allow users to upload job descriptions to tailor the extracted portfolio highlights automatically.
2. **Extended Predefined Themes:** Build out an expansive library of highly stylized and responsive presentation themes.
3. **Export & Embed:** Easy tools to export the static standalone portfolio code or embed it anywhere seamlessly.