import numpy as np
import torch
import torchaudio
from fastapi import WebSocket, BackgroundTasks
from transformers import pipeline
from config import settings
from typing import Optional

class TranscriptionManager:
    def __init__(self):
        self.model = None
        self.sample_rate = 16000  # Whisper's required sample rate
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self._init_model()

    def _init_model(self):
        """Initialize Whisper model with local model files"""
        self.model = pipeline(
            "automatic-speech-recognition",
            model=settings.WHISPER_MODEL,
            device=self.device,
            torch_dtype=torch.float16 if self.device == "cuda" else None,
        )

    async def _process_audio_chunk(self, audio_bytes: bytes) -> str:
        """Convert raw bytes to audio tensor and transcribe"""
        try:
            # Convert bytes to numpy array
            audio_np = np.frombuffer(audio_bytes, dtype=np.int16).astype(np.float32) / 32768.0

            # Resample if necessary (assuming client sends 16kHz by default)
            # if actual_sample_rate != self.sample_rate:
            #     audio_np = self._resample_audio(audio_np, actual_sample_rate)

            inputs = {
                "raw": audio_np,
                "sampling_rate": self.sample_rate
            }
            result = self.model(inputs)
            return result["text"]
        except Exception as e:
            print(f"Audio processing error: {str(e)}")
            return ""

    def _resample_audio(self, audio: np.ndarray, orig_sr: int) -> np.ndarray:
        """Resample audio to target sample rate using torchaudio"""
        tensor = torch.from_numpy(audio).float()
        resampler = torchaudio.transforms.Resample(orig_sr, self.sample_rate)
        return resampler(tensor).numpy()

    async def handle_transcription(self, websocket: WebSocket):
        """Main WebSocket handler for real-time transcription"""
        await websocket.accept()
        try:
            while True:
                # Receive audio chunk from client
                audio_bytes = await websocket.receive_bytes()
                
                # Process and transcribe
                transcription = await self._process_audio_chunk(audio_bytes)
                
                # Send partial results
                if transcription:
                    await websocket.send_text(transcription)
                    
        except Exception as e:
            print(f"WebSocket error: {str(e)}")
        finally:
            await websocket.close()

# Initialize manager instance
transcription_manager = TranscriptionManager()

# WebSocket endpoint
async def websocket_endpoint(websocket: WebSocket):
    await transcription_manager.handle_transcription(websocket)