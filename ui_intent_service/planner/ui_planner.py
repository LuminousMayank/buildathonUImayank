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
        
    # C & D) Mandatory Sections & Component Selection
    mandatory = set()
    if cat_label == "portfolio":
        mandatory.update(["hero", "contactForm"])
    elif cat_label == "landing":
        mandatory.add("hero")
    elif cat_label == "dashboard":
        # Dashboard must include chart or table. Check if any exists in prediction.
        has_chart_table = any(c.get("name") in ["chart", "table"] for c in components_data)
        if not has_chart_table:
            mandatory.add("chart")  # Fallback to chart if neither is predicted
            
    # Sort predicted components descending by probability
    sorted_comps = sorted(components_data, key=lambda x: x.get("prob", 0.0), reverse=True)
    
    # Start building our selected components list
    selected_names = []
    
    # 1. Ensure mandatory items are placed first
    for m in mandatory:
        selected_names.append(m)
        
    # 2. Fill the rest of the budget with predicted items
    for c in sorted_comps:
        if len(selected_names) >= budget:
            break
        c_name = c.get("name")
        if c_name not in selected_names:
            selected_names.append(c_name)
            
    # E) Section Ordering Rules
    # - hero always first if present
    # - contactForm near end
    # - footer always last
    
    final_ordered = []
    has_hero = "hero" in selected_names
    has_contact = "contactForm" in selected_names
    has_footer = "footer" in selected_names
    
    if has_hero:
        final_ordered.append("hero")
        selected_names.remove("hero")
        
    if has_contact:
        selected_names.remove("contactForm")
        
    if has_footer:
        selected_names.remove("footer")
        
    # Add remaining sections in middle
    final_ordered.extend(selected_names)
    
    # Add contactForm and footer at the end respectively
    if has_contact:
        final_ordered.append("contactForm")
    if has_footer:
        final_ordered.append("footer")
        
    # Format into sections payload
    sections = []
    for s_name in final_ordered:
        # Assign a random display variant deterministically depending on seed
        sections.append({
            "type": s_name,
            "variant": random.choice(["v1", "v2", "v3"])
        })
        
    # F) Design DNA
    design_dna = {
        "tone": random.choice(["minimal", "bold", "corporate"]),
        "palette": random.choice(["blue", "dark", "neutral"]),
        "density": random.choice(["compact", "spacious"]),
        "radius": random.choice(["sm", "md", "lg"])
    }
    
    return {
        "layout": "stack" if comp_label == "simple" else "responsive_grid",
        "section_budget": budget,
        "needs_clarification": needs_clarification,
        "sections": sections,
        "designDNA": design_dna
    }
