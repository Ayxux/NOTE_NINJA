import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from config import settings

class VectorStore:
    def __init__(self):
        self.embedder = SentenceTransformer(settings.EMBEDDING_MODEL)
        self.index = faiss.IndexFlatL2(self.embedder.get_sentence_embedding_dimension())
        self.documents = []
        self.metadata = []

    def add_document(self, text: str, metadata: dict):
        try:
            embeddings = self.embedder.encode([text])
        except UnicodeDecodeError:
            raise ValueError("Document encoding issue")
        self.index.add(np.array(embeddings, dtype=np.float32))
        self.documents.append(text)
        self.metadata.append(metadata)

    def query(self, text: str, n_results: int = 3):
        query_embedding = self.embedder.encode([text])
        distances, indices = self.index.search(np.array(query_embedding, dtype=np.float32), n_results)
        results = {
            "documents": [self.documents[i] for i in indices[0]],
            "metadata": [self.metadata[i] for i in indices[0]]
        }
        return results