from fastapi import FastAPI, WebSocket, UploadFile, File, Response # type: ignore
from fastapi.middleware.cors import CORSMiddleware
from routers.ws_transcription import transcription_manager
from services.summarizer import summarize_text
from services.rag_service import RAGService
from services import asr_service
from services.vector_store import VectorStore

app = FastAPI()
rag = RAGService()
vector_store = VectorStore()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await transcription_manager.handle_transcription(websocket)

@app.post("/summarize")
async def summarize(text: str):
    return {"summary": summarize_text(text)}

@app.post("/ask")
async def answer_question(question: str, transcript: str):
    return {"answer": rag.query(question)}

@app.post("/api/transcribe")
async def transcribe(response: Response, file: UploadFile = File(...)):
    # Save file temporarily
    try:
        content = await file.read()
        content_type = file.content_type
    except UnicodeDecodeError:
        response.headers["Access-Control-Allow-Origin"] = "*"
        return {"error": "File encoding issue"}
    
    if content_type not in ["audio/flac", "audio/mp3", "audio/mp4", "audio/mpeg", "audio/mpga", "audio/m4a", "audio/ogg", "audio/opus", "audio/wav", "audio/webm"]:
        response.headers["Access-Control-Allow-Origin"] = "*"
        return {"error": "Invalid file type"}
    
    transcript = await asr_service.transcribe_audio(content)
    vector_store.add_document(transcript, {})
    response.headers["Access-Control-Allow-Origin"] = "*"
    return {"transcript": transcript}

@app.post("/api/summarize")
async def summarize(response: Response, file: UploadFile = File(...)):
    try:
        text = (await file.read()).decode()
    except UnicodeDecodeError:
        response.headers["Access-Control-Allow-Origin"] = "*"
        return {"error": "File encoding issue"}
    response.headers["Access-Control-Allow-Origin"] = "*"
    return {"summary": summarize_text(text)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
