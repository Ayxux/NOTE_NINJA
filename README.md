# NOTE_NINJA

Overview

Note Ninja is an AI-powered meeting assistant that transcribes and summarizes meeting audio in real-time. It leverages Whisper AI for transcription and LLMs (Groq-Mistral/GPT-4-Turbo) for generating structured summaries.

🚀 Key Features:

Automatic Transcription: Converts speech to text with high accuracy.

Concise Summaries: Extracts key takeaways, action points, and timestamps.

Fast & Efficient: Processes audio in seconds.

User-Friendly UI: Simple interface for uploading audio and viewing summaries.

Deployed & Ready to Use: Works via a web app.

⚙️ Tech Stack

Backend: Flask (Python), OpenAI Whisper, Groq-Mistral/GPT-4-Turbo

Frontend: Streamlit

Deployment: Render (Backend), Streamlit Cloud (Frontend)

🚀 Quick Start

1️⃣ Clone the Repository
```
git clone https://github.com/your-username/note-ninja.git
cd note-ninja
```
2️⃣ Install Dependencies
```
pip install -r requirements.txt
```
3️⃣ Run the Backend API (Flask)
```
cd backend
python app.py
```
4️⃣ Run the Frontend (Streamlit)
```
cd frontend
streamlit run app.py
```
🔥 Usage

Upload a meeting audio file (.mp3, .wav, .m4a).

Wait for transcription & summary generation.

View structured notes with timestamps & action items.

Download summary as a text file.

🎯 API Endpoints

1️⃣ Upload Audio & Get Summary

Endpoint: /transcribe

Method: POST

Payload: multipart/form-data (audio file)

Response: JSON with transcription & summary
```
{
    "transcription": "Full text of the meeting...",
    "summary": "- Key points\n- Action items\n- Questions raised..."
}
```
🚀 Deployment!

1️⃣ Deploy Backend to Render

Create a Render account.

Deploy Flask API as a web service.

2️⃣ Deploy Frontend to Streamlit Cloud

Push the repo to GitHub.

Connect GitHub to Streamlit Cloud.

Deploy and share the link.
