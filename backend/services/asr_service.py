import groq
from config import settings

async def transcribe_audio(audio_file_path: str) -> str:
    client = groq.Client(api_key=settings.GROQ_API_KEY)
    # Convert audio to bytes (assume preprocessing for Whisper input)
    with open(audio_file_path, "rb") as f:
        audio_data = f.read()
    
    response = client.audio.transcriptions.create(
        file=audio_data,
        model=settings.WHISPER_MODEL
    )
    return response.text