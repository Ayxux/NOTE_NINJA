from groq import Groq
from config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

def summarize_text(text: str) -> str:
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": f"Summarize this:\n{text}"}],
        model="mixtral-8x7b-32768"
    )
    return response.choices[0].message.content