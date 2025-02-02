from fastapi import FastAPI, WebSocket # type: ignore
from routers.ws_transcription import transcription_manager
from services.summarizer import summarize_text
from services.rag_service import RAGService

app = FastAPI()
rag = RAGService()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await transcription_manager.handle_transcription(websocket)

@app.post("/summarize")
async def summarize(text: str):
    return {"summary": summarize_text(text)}

@app.post("/ask")
async def answer_question(question: str, transcript: str):
    return {"answer": rag.query(question)}
