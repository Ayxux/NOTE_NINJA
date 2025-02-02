from pydantic import BaseSettings

class Settings(BaseSettings):
    GROQ_API_KEY: str = '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'
    EMBEDDING_MODEL: str = "sentence-transformers/all-mpnet-base-v2"
    WHISPER_MODEL: str = "distil-whisper/distil-large-v3"
    
    class Config:
        env_file = ".env"

settings = Settings()