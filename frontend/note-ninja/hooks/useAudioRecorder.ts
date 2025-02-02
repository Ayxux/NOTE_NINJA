import { useState, useRef } from 'react';
import { useWebSocketClient } from './useWebSocketClient';

export default function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaStream = useRef<MediaStream | null>(null);
  const { sendAudio } = useWebSocketClient();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = async (e) => {
        const buffer = await e.data.arrayBuffer();
        sendAudio(new Uint8Array(buffer));
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

  return { isRecording, startRecording, stopRecording };
}