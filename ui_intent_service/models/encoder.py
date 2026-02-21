import torch
from sentence_transformers import SentenceTransformer

# Load sentence-transformers/all-MiniLM-L6-v2
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Set model to eval mode
model.eval()

# Freeze all parameters
for param in model.parameters():
    param.requires_grad = False

def encode_text(text: str) -> torch.Tensor:
    """
    Takes a string and returns a torch tensor of shape (1, 384).
    """
    # Use model.encode with convert_to_tensor=True
    tensor_out = model.encode(text, convert_to_tensor=True)
    
    # Ensure consistent batch shape (1, 384) if output is (384,)
    if len(tensor_out.shape) == 1:
        tensor_out = tensor_out.unsqueeze(0)
        
    return tensor_out
