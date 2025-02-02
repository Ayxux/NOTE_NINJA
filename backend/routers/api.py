from fastapi import APIRouter, UploadFile, File
from services import asr_service, summarizer, rag_service

router = APIRouter()

@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    # Save file temporarily
    content = await file.read()
    transcript = await asr_service.transcribe_audio(content)
    vector_store.add_document(transcript)
    return {"transcript": transcript}

@router.post("/summarize")
async def summarize(file: UploadFile = File(...)):
    text = (await file.read()).decode()
    return {"summary": summarizer.summarize_text(text)}
