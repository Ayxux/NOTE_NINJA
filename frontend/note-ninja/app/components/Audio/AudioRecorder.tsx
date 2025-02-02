import { useState, useRef } from 'react';

export default function AudioRecorder({ onAudioData }: { onAudioData: (data: Uint8Array) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current);
        audioBlob.arrayBuffer().then(buffer => {
          onAudioData(new Uint8Array(buffer));
        });
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-4 rounded-full ${
          isRecording ? 'bg-red-500' : 'bg-green-500'
        } text-white transition-all duration-300`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}