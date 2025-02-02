from fastapi import FastAPI, WebSocket # type: ignore
from routers.ws_transcription import manager
from services.summarizer import generate_summary
from services.rag_service import RAGSystem

app = FastAPI()
rag = RAGSystem()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    await manager.handle_audio(websocket)

@app.post("/summarize")
async def summarize(text: str):
    return {"summary": generate_summary(text)}

@app.post("/ask")
async def answer_question(question: str, transcript: str):
    return {"answer": rag.answer_question(question, transcript.split(". "))}
