# NOTE_NINJA

## Live Audio Transcription and Summarization API
## Overview
This application provides two primary functionalities:

Live Audio Transcription: Real-time speech-to-text conversion with continuous transcription displayed on the frontend.
Audio File Upload and Summarization: Users can upload audio files, which will be transcribed and summarized.
Both processes are handled by a Flask backend and use Whisper for transcription and Groq-Mistral for text summarization.

## Features
Live Audio Transcription: Captures audio from the microphone and transcribes it in real-time.
Text Summarization: Once transcription is complete, the text is sent to the Groq-Mistral LLM to generate structured summaries, including bullet points, timestamps, key topics, and action items.
Audio File Upload: Upload audio files (in formats like .mp3, .wav, .m4a) for transcription and summarization.
Real-time UI Updates: Transcripts are displayed live in the frontend as they are generated.
Downloadable Summary: Option for users to download the summarized text as a .txt file.

## Technologies
Backend: Flask
Real-time Transcription: Whisper (by OpenAI)
Summarization: Groq-Mistral LLM
Frontend: HTML + JavaScript (with Flask-SocketIO for live updates)
Audio Handling: PyAudio (for real-time microphone input)

## Setup Instructions
Step 1: Clone the Repository
```
git clone https://github.com/Ayxux/NOTE_NINJA.git
cd NOTE_NINJA
```
Step 2: Install Dependencies
Create a virtual environment (optional but recommended):
```
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```
Install the required libraries:
```
pip install -r requirements.txt
```

Step 3: Run the Flask Application
To start the Flask app with real-time audio transcription:
```
python app.py
```

Step 4: Open the Application
Once the Flask server is running, navigate to:
```
http://127.0.0.1:5000
```
## Functionality
1. Live Audio Transcription
When you visit the webpage, the app will continuously listen to the microphone input.
The transcription will be displayed on the screen as text, updating in real-time.
The transcribed text will also be sent to the backend for summarization once sufficient content is captured.
2. Audio File Upload
Users can upload audio files for transcription and summarization by selecting the file input.
Supported file types: .mp3, .wav, .m4a
The audio is processed by Whisper for transcription and then summarized by Groq-Mistral.
3. Summarization Output
The application will provide the following output after transcription:

### Bullet Points: Key points summarized from the transcript.
### Timestamps: Time references from the transcript.
### Key Topics: Identified important topics discussed.
### Action Items: Any actionable tasks mentioned in the conversation.

-------------------------------------------------------------------------------------------------------------------------------------------------------------

# API Endpoints
## 1. /upload_audio
Method: POST
Description: Allows the user to upload an audio file for transcription and summarization.
Request Body: Multipart form data with file field for the audio file.
Response: Returns a JSON with the summarized content, including bullet points, timestamps, and action items.
Example request (using curl):
```
curl -X POST -F "file=@path/to/audio.mp3" http://127.0.0.1:5000/upload_audio
```
Example response:
```
{
  "summary": "Meeting Summary",
  "bullet_points": ["Point 1", "Point 2"],
  "timestamps": ["00:01", "02:34"],
  "action_items": ["Task 1", "Task 2"]
}
```
## 2. / (Live Transcription)
Method: GET
Description: Serves the UI where users can interact with the live transcription feature.
Response: Returns a live updated transcript via WebSocket.
Known Issues
The live transcription may have occasional delays depending on network conditions.
Currently, the transcription model (Whisper) works best for English and may have limited accuracy in other languages.

## Future Improvements
Multilingual Support: Implement support for additional languages in transcription.
Enhanced Summarization: Add advanced summarization techniques, such as topic clustering.
Save Transcript: Provide functionality to save and download the full transcription before summarization.
