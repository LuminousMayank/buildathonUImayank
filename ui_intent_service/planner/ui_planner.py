import random

def generate_ui_plan(prediction_output: dict, prompt: str = "", seed: int | None = None) -> dict:
    """
    Takes the structured output from the ML prediction and generates a
    deterministic UI plan respecting business logic, budgets, and design DNA.
    """
    if seed is not None:
        random.seed(seed)
        
    category_data = prediction_output.get("category", {})
    complexity_data = prediction_output.get("complexity", {})
    components_data = prediction_output.get("components", [])
    
    prompt_lower = prompt.lower()
    
    cat_label = category_data.get("label", "unknown")
    cat_conf = category_data.get("confidence", 0.0)
    comp_label = complexity_data.get("label", "standard")
    
    # A) Confidence Handling
    needs_clarification = bool(cat_conf < 0.6)
    
    # B) Section Budget Rules
    if comp_label == "simple":
        budget = 3
    elif comp_label == "rich":
        budget = 10
    else:
        budget = 6
        
    # 1. Determine Layout Mode
    app_keywords = ["app", "tool", "manager", "task", "board", "crm", "admin", "productivity", "internal"]
    mkt_keywords = ["marketing", "landing", "promotion", "website", "campaign"]
    
    has_app = any(kw in prompt_lower for kw in app_keywords)
    has_mkt = any(kw in prompt_lower for kw in mkt_keywords)

    if has_app and not has_mkt:
        layout_mode = "application"
    elif cat_label == "dashboard":
        layout_mode = "dashboard"
    elif cat_label == "portfolio":
        layout_mode = "creative"
    else:
        layout_mode = "landing"
    
    # 2. Base Templates (ensuring standard templates requested)
    if layout_mode == "application":
        if comp_label == "simple":
            base_template = ["topbar", "sidebar", "board"]
            budget = max(budget, 3)
        elif comp_label == "rich":
            base_template = ["topbar", "sidebar", "board", "table", "activityFeed", "footer"]
            budget = max(budget, 6)
        else: # standard
            base_template = ["topbar", "sidebar", "board", "statsStrip", "footer"]
            budget = max(budget, 5)
    elif layout_mode == "dashboard":
        if comp_label == "simple":
            base_template = ["hero", "kpiTiles", "chartPanel"]
            budget = max(budget, 3)
        elif comp_label == "rich":
            base_template = ["hero", "kpiTiles", "chartPanel", "table", "projectsGrid", "footer"]
            budget = max(budget, 6)
        else: # standard
            base_template = ["hero", "kpiTiles", "chartPanel", "footer"]
            budget = max(budget, 4)
    elif layout_mode == "creative":
        if comp_label == "simple":
            base_template = ["fullscreenHero", "marqueeBand", "splitReveal", "bentoGrid", "footer"]
            budget = max(budget, 5)
        elif comp_label == "rich":
            base_template = ["fullscreenHero", "marqueeBand", "splitReveal", "bentoGrid", "interactiveCardGrid", "horizontalGallery", "footer"]
            budget = max(budget, 7)
        else: # standard
            base_template = ["fullscreenHero", "marqueeBand", "splitReveal", "bentoGrid", "horizontalGallery", "footer"]
            budget = max(budget, 6)
    else: # landing
        if comp_label == "simple":
            base_template = ["hero", "featuresRow", "footer"]
            budget = max(budget, 3)
        elif comp_label == "rich":
            base_template = ["hero", "featuresRow", "projectsGrid", "kpiTiles", "ctaBand", "contactForm", "footer"]
            budget = max(budget, 7)
        else: # standard
            base_template = ["hero", "featuresRow", "kpiTiles", "ctaBand", "footer"]
            budget = max(budget, 5)

    # 3. Component Selection (Merge predicted components up to budget)
    selected_names = list(base_template)
    
    # Sort ML inferred components descending by probability
    sorted_comps = sorted(components_data, key=lambda x: x.get("prob", 0.0), reverse=True)
    
    for c in sorted_comps:
        if len(selected_names) >= budget:
            break
        c_name = c.get("name")
        if layout_mode == "application" and c_name in ["hero", "fullscreenHero"]:
            continue
        if c_name not in selected_names:
            selected_names.append(c_name)

    # 4. Enforce Unified Section Ordering Rules
    # Master dictionary for standard logical UI sorting weight
    master_order = {
        "topbar": 0,
        "sidebar": 1,
        "hero": 2,
        "fullscreenHero": 2,
        "marqueeBand": 3,
        "splitReveal": 4,
        "board": 5,
        "statsStrip": 6,
        "activityFeed": 7,
        "bentoGrid": 8,
        "featuresRow": 9,
        "features": 9,
        "projectsGrid": 10,
        "interactiveCardGrid": 10,
        "gallery": 11,
        "horizontalGallery": 11,
        "kpiTiles": 12,
        "kpiCards": 12,
        "chartPanel": 13,
        "chart": 13,
        "table": 14,
        "ctaBand": 15,
        "contactForm": 16,
        "footer": 99
    }
    
    # Safely sort the selected names using the master dict (fallbacks to end if unknown ML label)
    final_ordered = sorted(selected_names, key=lambda x: master_order.get(x, 50))
    
    # Format into structured payload assigning deterministic variants safely
    sections = []
    for s_name in final_ordered:
        # Give 'hero' the 'compact' variant specifically on dashboard if standard/rich
        if layout_mode == "dashboard" and s_name == "hero":
            var = "compact"
        else:
            var = random.choice(["v1", "v2", "v3"])
            
        sections.append({
            "type": s_name,
            "variant": var
        })
        
    # F) Design DNA
    design_dna = {
        "tone": random.choice(["minimal", "bold", "corporate"]),
        "palette": random.choice(["blue", "dark", "neutral"]),
        "density": random.choice(["compact", "spacious"]),
        "radius": random.choice(["sm", "md", "lg"])
    }
    
    # G) Explanation
    if layout_mode == "application":
        layout_reason = "Application topology selected to support complex interactive workflows and internal tool structures."
    elif layout_mode == "dashboard":
        layout_reason = "Dashboard topology selected to support analytical metrics and data visualization elements."
    elif layout_mode == "creative":
        layout_reason = "Creative gallery topology selected to highlight visual portfolios and case studies."
    else:
        layout_reason = "Standard landing topology selected to drive conversion and feature marketing."

    if comp_label == "simple":
        complexity_reason = "Minimalist component density chosen for a clean, focused user experience."
    elif comp_label == "rich":
        complexity_reason = "High-density component architecture chosen to present comprehensive information and interactive elements."
    else:
        complexity_reason = "Standard component density chosen for a balanced structural flow."

    section_reason = f"Base layout constructed using the '{layout_mode}' blueprint to establish an intuitive viewing hierarchy."
    ml_reason = f"Augmented with additional sections injected dynamically via semantic intent prediction (Confidence: {cat_conf*100:.1f}%)."

    explanation = {
        "layout_reason": layout_reason,
        "complexity_reason": complexity_reason,
        "section_reason": section_reason,
        "ml_reason": ml_reason
    }

    return {
        "layout": cat_label,
        "layout_mode": layout_mode,
        "section_budget": len(sections),
        "needs_clarification": needs_clarification,
        "sections": sections,
        "designDNA": design_dna,
        "explanation": explanation
    }
