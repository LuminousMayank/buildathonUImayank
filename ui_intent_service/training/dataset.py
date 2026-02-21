import torch
import pandas as pd
from torch.utils.data import Dataset

# Need to import our encoder to embed the text
from models.encoder import encode_text

# Default mappings to easily map string labels from CSV to integer indices / vectors
DEFAULT_CATEGORY_MAP = {'portfolio': 0, 'landing': 1, 'dashboard': 2}
DEFAULT_COMPLEXITY_MAP = {'simple': 0, 'standard': 1, 'rich': 2}
DEFAULT_COMPONENTS = ['hero', 'projectsGrid', 'gallery', 'contactForm', 'features', 'chart', 'table', 'kpiCards']

class UIPromptDataset(Dataset):
    """
    Dataset to load a CSV containing text prompts and target UI attributes.
    Columns expected: text, category, complexity, components
    """
    def __init__(self, csv_file: str, 
                 category_map: dict = None, 
                 complexity_map: dict = None, 
                 components_list: list = None):
        
        self.data = pd.read_csv(csv_file)
        self.category_map = category_map or DEFAULT_CATEGORY_MAP
        self.complexity_map = complexity_map or DEFAULT_COMPLEXITY_MAP
        self.components_list = components_list or DEFAULT_COMPONENTS
        
    def __len__(self):
        return len(self.data)
        
    def __getitem__(self, idx):
        row = self.data.iloc[idx]
        
        # 1. Encode text using frozen SentenceTransformer
        text = str(row['text'])
        # encode_text returns (1, 384). We squeeze to (384,) for proper batch collating.
        # We also use .clone().detach() to ensure the tensor respects training graph execution
        # and circumvents PyTorch's 'inference tensor cannot be saved for backward' exceptions.
        with torch.no_grad():
            embedding = encode_text(text).clone().detach().squeeze(0)
            
        # 2. Convert category -> index (0-2)
        category_str = str(row['category']).strip().lower()
        category_label = torch.tensor(self.category_map.get(category_str, 0), dtype=torch.long)
        
        # 3. Convert complexity -> index (0-2)
        complexity_str = str(row['complexity']).strip().lower()
        complexity_label = torch.tensor(self.complexity_map.get(complexity_str, 0), dtype=torch.long)
        
        # 4. Convert components -> multi-hot vector of length 8
        components_str = str(row['components'])
        # Assume pipe-separated, e.g., "hero|projectsGrid|contactForm"
        row_components = [c.strip() for c in components_str.split('|')]
        
        component_vector = torch.zeros(len(self.components_list), dtype=torch.float32)
        for i, comp in enumerate(self.components_list):
            if comp in row_components:
                component_vector[i] = 1.0
                
        return embedding, category_label, complexity_label, component_vector
