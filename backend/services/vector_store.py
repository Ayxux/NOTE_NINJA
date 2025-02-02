import chromadb
from sentence_transformers import SentenceTransformer

class VectorStore:
    def __init__(self):
        self.client = chromadb.Client()
        self.collection = self.client.create_collection("transcripts")
        self.embedder = SentenceTransformer(settings.EMBEDDING_MODEL)
    
    def add_document(self, text: str, metadata: dict):
        embeddings = self.embedder.encode(text)
        self.collection.add(
            embeddings=embeddings.tolist(),
            documents=text,
            metadatas=metadata
        )