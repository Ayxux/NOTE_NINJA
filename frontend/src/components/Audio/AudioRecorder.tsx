// src/components/AudioRecorder.tsx
import React, { useState } from 'react';
import  useWebSocket  from 'react-use-websocket';
import { useReactMediaRecorder } from 'react-media-recorder';

const AudioRecorder = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);

  // Handle WebSocket connection
  const { sendMessage, readyState } = useWebSocket(
    'ws://localhost:8000/ws/transcribe',
    {
      onMessage: (e) => {
        setTranscript((prev) => prev + ' ' + e.data);
      },
      shouldReconnect: () => true,
    }
  );

  // Audio recording handler
  const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: async (_, blob) => {
      const buffer = await blob.arrayBuffer();
      sendMessage(buffer); // Send raw audio data
      setIsRecording(false);
    },
    onStart: () => setIsRecording(true),
  });

  return (
    <div className="recorder-container">
      <button 
        onClick={startRecording} 
        disabled={isRecording || readyState !== 1}
      >
        Start Recording
      </button>
      <button 
        onClick={stopRecording} 
        disabled={!isRecording}
      >
        Stop Recording
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default AudioRecorder;