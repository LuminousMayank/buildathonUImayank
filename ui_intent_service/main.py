from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="UI Intent Service")

class IntentRequest(BaseModel):
    query: str

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict_intent(request: IntentRequest):
    # This is a stub for the intention prediction service.
    # We will load transformer models here in the future.
    return {"intent": "unknown", "confidence": 0.0}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
