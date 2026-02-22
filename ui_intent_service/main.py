import torch
from fastapi import FastAPI
from pydantic import BaseModel

from models.encoder import encode_text
from models.ui_intent_model import UIIntentModel
from training.dataset import DEFAULT_CATEGORY_MAP, DEFAULT_COMPLEXITY_MAP, DEFAULT_COMPONENTS
from planner.ui_planner import generate_ui_plan
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from services.llm_client import generate_marketing_copy

# Initialize FastAPI app
app = FastAPI(title="UI Intent Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup inference device
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# Load intent model
model = UIIntentModel(input_size=384)
# Load trained weights
weights_path = "models/ui_intent_heads.pt"
try:
    model.load_state_dict(torch.load(weights_path, map_location=device, weights_only=True))
    print("Loaded trained model weights.")
except FileNotFoundError:
    print("Warning: Trained weights not found. Using untrained initialization.")
model = model.to(device)
model.eval()

# Inverse maps for decoding inferences
INV_CATEGORY_MAP = {v: k for k, v in DEFAULT_CATEGORY_MAP.items()}
INV_COMPLEXITY_MAP = {v: k for k, v in DEFAULT_COMPLEXITY_MAP.items()}

class IntentRequest(BaseModel):
    prompt: str

class PlanRequest(BaseModel):
    prompt: str
    seed: int | None = None

class GenerateCopyRequest(BaseModel):
    prompt: str
    layout_mode: str
    sections: list

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict_intent(request: IntentRequest):
    CATEGORY_LABELS = ["portfolio", "landing", "dashboard"]
    COMPLEXITY_LABELS = ["simple", "standard", "rich"]
    COMPONENT_LABELS = ["hero", "projectsGrid", "gallery", "contactForm", "features", "chart", "table", "kpiCards"]

    with torch.no_grad():
        # 1. Encode text
        embedding = encode_text(request.prompt).to(device)
        
        # 2. Forward pass
        cat_logits, comp_logits, components_logits = model(embedding)
        
        # 3. Softmax / Sigmoid
        cat_probs = torch.softmax(cat_logits, dim=1).squeeze(0).cpu().tolist()
        comp_probs = torch.softmax(comp_logits, dim=1).squeeze(0).cpu().tolist()
        components_probs = torch.sigmoid(components_logits).squeeze(0).cpu().tolist()

        # Category processing
        cat_top_k = [
            {"label": CATEGORY_LABELS[i], "prob": round(p, 3)}
            for i, p in enumerate(cat_probs)
        ]
        # Sort descending
        cat_top_k.sort(key=lambda x: x["prob"], reverse=True)
        best_cat = cat_top_k[0]

        # Complexity processing
        comp_top_k = [
            {"label": COMPLEXITY_LABELS[i], "prob": round(p, 3)}
            for i, p in enumerate(comp_probs)
        ]
        comp_top_k.sort(key=lambda x: x["prob"], reverse=True)
        best_comp = comp_top_k[0]

        # Components processing
        predicted_components = []
        for i, p in enumerate(components_probs):
            if p > 0.5:
                predicted_components.append({
                    "name": COMPONENT_LABELS[i],
                    "prob": round(p, 3)
                })

        return {
            "category": {
                "label": best_cat["label"],
                "confidence": best_cat["prob"],
                "top_k": cat_top_k
            },
            "complexity": {
                "label": best_comp["label"],
                "confidence": best_comp["prob"]
            },
            "components": predicted_components,
            "section_budget": 6,
            "needs_clarification": False
        }

@app.post("/plan")
def create_plan(request: PlanRequest):
    # Internally call existing prediction logic directly
    prediction_output = predict_intent(IntentRequest(prompt=request.prompt))
    
    # Pass prediction output into generate_ui_plan
    ui_plan = generate_ui_plan(prediction_output, prompt=request.prompt, seed=request.seed)
    
    # Fast keyword intercepts to bypass PyTorch frozen weights for new modules (Ensure 1-to-1 max overrides!)
    prompt_lower = request.prompt.lower()
    injected_overrides = set()
    
    for sec in ui_plan.get("sections", []):
        if "fullscreen" in prompt_lower and sec["type"] == "hero" and "fullscreenHero" not in injected_overrides:
            sec["type"] = "fullscreenHero"
            injected_overrides.add("fullscreenHero")
        elif "bento" in prompt_lower and sec["type"] in ["features", "featuresRow"] and "bentoGrid" not in injected_overrides:
            sec["type"] = "bentoGrid"
            injected_overrides.add("bentoGrid")
        elif "marquee" in prompt_lower and sec["type"] in ["projectsGrid", "contactForm", "ctaBand"] and "marqueeBand" not in injected_overrides:
            sec["type"] = "marqueeBand"
            injected_overrides.add("marqueeBand")
        elif "split" in prompt_lower and sec["type"] in ["projectsGrid", "featuresRow", "features"] and "splitReveal" not in injected_overrides:
            sec["type"] = "splitReveal"
            injected_overrides.add("splitReveal")
        elif "gallery" in prompt_lower and sec["type"] in ["projectsGrid", "featuresRow", "features"] and "horizontalGallery" not in injected_overrides:
            sec["type"] = "horizontalGallery"
            injected_overrides.add("horizontalGallery")
            
    # Final deduplication loop as a failsafe
    seen = set()
    deduped_sections = []
    for s in ui_plan.get("sections", []):
        if s["type"] not in seen:
            seen.add(s["type"])
            deduped_sections.append(s)
    ui_plan["sections"] = deduped_sections
            
    return ui_plan

@app.post("/generate-copy")
async def generate_copy(request: GenerateCopyRequest):
    try:
        content = await asyncio.wait_for(
            generate_marketing_copy(
                prompt=request.prompt,
                layout_mode=request.layout_mode,
                sections=request.sections
            ),
            timeout=8.0
        )
        return content
    except asyncio.TimeoutError:
        return {}
    except Exception as e:
        print(f"Generate copy failed: {e}")
        return {}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
