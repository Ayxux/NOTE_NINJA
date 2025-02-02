import { useState, useRef } from 'react';
import { useWebSocketClient } from '../../hooks/useWebSocketClient';
import AudioControls from './AudioControls';

interface AudioRecorderProps {
  onAudioData: (data: Uint8Array) => void;
}

export default function AudioRecorder({ onAudioData }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaStream = useRef<MediaStream | null>(null);
  const { sendAudio } = useWebSocketClient("wss://your-websocket-url");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = async (e) => {
        const buffer = await e.data.arrayBuffer();
        const audioData = new Uint8Array(buffer);
        sendAudio(audioData);
        onAudioData(audioData);
      };
      
      recorder.start(500);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    mediaStream.current?.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  };

  return (
    <AudioControls 
      isRecording={isRecording}
      onStart={startRecording}
      onStop={stopRecording}
    />
  );
}