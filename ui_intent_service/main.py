import torch
from fastapi import FastAPI
from pydantic import BaseModel

from models.encoder import encode_text
from models.ui_intent_model import UIIntentModel
from training.dataset import DEFAULT_CATEGORY_MAP, DEFAULT_COMPLEXITY_MAP, DEFAULT_COMPONENTS
from planner.ui_planner import generate_ui_plan
from fastapi.middleware.cors import CORSMiddleware

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
    ui_plan = generate_ui_plan(prediction_output, seed=request.seed)
    
    return ui_plan

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
