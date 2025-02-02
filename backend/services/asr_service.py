import groq
from config import settings

async def transcribe_audio(audio_data: bytes) -> str:
    client = groq.Client(api_key=settings.GROQ_API_KEY)
    print("Sending file to ASR service...")
    
    # Provide a filename with an appropriate extension (e.g., "audio.mp3")
    response = client.audio.transcriptions.create(
        file=("audio.mp3", audio_data),
        model="distil-whisper-large-v3-en",  # Correct model identifier
        # Optionally, you can also add:
        # response_format="json",
        # language="en",
        # temperature=0.0
    )
    return response.text
