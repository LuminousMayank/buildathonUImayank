import torch
from models.encoder import encode_text
from models.ui_intent_model import UIIntentModel

if __name__ == "__main__":
    # Instantiate UIIntentModel
    model = UIIntentModel()
    
    # Encode the text "minimal portfolio website"
    text = "minimal portfolio website"
    print(f"Encoding text: '{text}'...")
    embedding = encode_text(text)
    
    model = model.to(embedding.device)
    
    # Pass embedding into the model
    print("Passing embedding through UIIntentModel...")
    # Wrap in no_grad because embedding is created in inference_mode by SentenceTransformers
    with torch.no_grad():
        category_logits, complexity_logits, components_logits = model(embedding)
    
    # Print the shapes
    print("\n--- Model Output Shapes ---")
    print(f"Category logits shape: {category_logits.shape}")
    print(f"Complexity logits shape: {complexity_logits.shape}")
    print(f"Components logits shape: {components_logits.shape}")
    
    # Print whether embedding.requires_grad is True or False
    print("\n--- Gradient Tracking ---")
    print(f"embedding.requires_grad: {embedding.requires_grad}")
