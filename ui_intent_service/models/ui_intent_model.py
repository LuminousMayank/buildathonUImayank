import torch
import torch.nn as nn

class UIIntentModel(nn.Module):
    """
    A PyTorch model that predicts UI intent properties from text embeddings.
    
    It takes an input text embedding (shape: batch_size x 384) and outputs
    raw logits for category, complexity, and components through separate linear heads.
    No activation functions (like softmax or sigmoid) are applied here.
    """
    def __init__(self, input_size: int = 384):
        super(UIIntentModel, self).__init__()
        
        # Define three separate linear heads
        self.category_head = nn.Linear(input_size, 3)
        self.complexity_head = nn.Linear(input_size, 3)
        self.components_head = nn.Linear(input_size, 8)
        
    def forward(self, x: torch.Tensor) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """
        Forward pass for predicting UI intent properties.

        Args:
            x (torch.Tensor): Input embedding tensor of shape (batch_size, input_size).

        Returns:
            tuple: Raw logits for category, complexity, and components.
                   - category_logits: shape (batch_size, 3)
                   - complexity_logits: shape (batch_size, 3)
                   - components_logits: shape (batch_size, 8)
        """
        category_logits = self.category_head(x)
        complexity_logits = self.complexity_head(x)
        components_logits = self.components_head(x)
        
        return category_logits, complexity_logits, components_logits
