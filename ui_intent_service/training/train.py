import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from models.ui_intent_model import UIIntentModel
from training.dataset import UIPromptDataset

def train(csv_path: str, epochs: int = 10, batch_size: int = 4, lr: float = 1e-3):
    # Setup Device
    device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
    print(f"Using device: {device}")
    
    # Load dataset
    print(f"Loading dataset from: {csv_path}")
    dataset = UIPromptDataset(csv_path)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    
    # Load UIIntentModel & Move to device
    model = UIIntentModel(input_size=384)
    model = model.to(device)
    
    # Define Loss Functions
    # 1. Category (multi-class: 3 classes)
    criterion_category = nn.CrossEntropyLoss()
    # 2. Complexity (multi-class: 3 classes)
    criterion_complexity = nn.CrossEntropyLoss()
    # 3. Components (multi-label: 8 independent binary classes)
    criterion_components = nn.BCEWithLogitsLoss()
    
    # Define Optimizer (only model heads are updated)
    optimizer = optim.Adam(model.parameters(), lr=lr)
    
    # Training Loop
    model.train()
    print("Starting training...")
    for epoch in range(epochs):
        epoch_loss = 0.0
        
        for batch_idx, (embeddings, cat_labels, comp_labels, component_vecs) in enumerate(dataloader):
            # Move to device
            embeddings = embeddings.to(device)
            cat_labels = cat_labels.to(device)
            comp_labels = comp_labels.to(device)
            component_vecs = component_vecs.to(device)
            
            # Zero gradients
            optimizer.zero_grad()
            
            # Forward pass
            cat_logits, comp_logits, components_logits = model(embeddings)
            
            # Compute loss
            loss_cat = criterion_category(cat_logits, cat_labels)
            loss_comp = criterion_complexity(comp_logits, comp_labels)
            loss_components = criterion_components(components_logits, component_vecs)
            
            # Total Loss
            loss = loss_cat + loss_comp + loss_components
            
            # Backward pass & Optimize
            loss.backward()
            optimizer.step()
            
            epoch_loss += loss.item()
            
        avg_loss = epoch_loss / len(dataloader)
        print(f"Epoch [{epoch+1}/{epochs}] - Loss: {avg_loss:.4f}")
        
    # Save Trained Weights
    output_path = "models/ui_intent_heads.pt"
    # Ensure dir exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    torch.save(model.state_dict(), output_path)
    print(f"Training complete. Weights saved to {output_path}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python3 -m training.train <path_to_csv>")
    else:
        train(sys.argv[1])
