from groq import Groq

class RAGService:
    def __init__(self):
        self.vector_store = VectorStore()
        self.llm = Groq(api_key=settings.GROQ_API_KEY)
    
    def query(self, question: str) -> str:
        query_embedding = self.vector_store.embedder.encode(question)
        results = self.vector_store.collection.query(
            query_embeddings=query_embedding.tolist(),
            n_results=3
        )
        context = "\n".join(results["documents"][0])
        prompt = f"Answer using context:\n{context}\n\nQuestion: {question}"
        return self.llm.chat.completions.create(...)