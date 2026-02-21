import random

def generate_ui_plan(prediction_output: dict, seed: int | None = None) -> dict:
    """
    Takes the structured output from the ML prediction and generates a
    deterministic UI plan respecting business logic, budgets, and design DNA.
    """
    if seed is not None:
        random.seed(seed)
        
    category_data = prediction_output.get("category", {})
    complexity_data = prediction_output.get("complexity", {})
    components_data = prediction_output.get("components", [])
    
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
    layout_mode = "dashboard" if cat_label == "dashboard" else "landing"
    
    # 2. Base Templates (ensuring standard templates requested)
    if layout_mode == "dashboard":
        if comp_label == "simple":
            base_template = ["hero", "kpiTiles", "chartPanel"]
            budget = max(budget, 3)
        elif comp_label == "rich":
            base_template = ["hero", "kpiTiles", "chartPanel", "table", "projectsGrid", "footer"]
            budget = max(budget, 6)
        else: # standard
            base_template = ["hero", "kpiTiles", "chartPanel", "footer"]
            budget = max(budget, 4)
    else: # landing (portfolio/landing)
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
        if c_name not in selected_names:
            selected_names.append(c_name)

    # 4. Enforce Unified Section Ordering Rules
    # Master dictionary for standard logical UI sorting weight
    master_order = {
        "hero": 1,
        "featuresRow": 2,
        "features": 3,
        "projectsGrid": 4,
        "gallery": 5,
        "kpiTiles": 6,
        "kpiCards": 7,
        "chartPanel": 8,
        "chart": 9,
        "table": 10,
        "ctaBand": 11,
        "contactForm": 12,
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
    
    return {
        "layout": cat_label,
        "layout_mode": layout_mode,
        "section_budget": len(sections),
        "needs_clarification": needs_clarification,
        "sections": sections,
        "designDNA": design_dna
    }
