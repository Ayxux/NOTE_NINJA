from groq import Groq
from config import settings
from services.vector_store import VectorStore

class RAGService:
    def __init__(self):
        self.vector_store = VectorStore()
        self.llm = Groq(api_key=settings.GROQ_API_KEY)
    
    def query(self, question: str) -> str:
        results = self.vector_store.query(question, n_results=3)
        context = "\n".join(results["documents"])
        prompt = f"Answer using context:\n{context}\n\nQuestion: {question}"
        return self.llm.chat.completions.create(...)