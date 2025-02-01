import { FC } from 'react';
import { Mic, StopCircle } from 'lucide-react';

interface AudioControlsProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
}

const AudioControls: FC<AudioControlsProps> = ({ isRecording, onStart, onStop }) => {
  return (
    <div className="audio-controls-container">
      <button
        type="button"
        onClick={onStart}
        disabled={isRecording}
        className={`control-button ${isRecording ? 'disabled' : ''}`}
        aria-label="Start recording"
      >
        <Mic className="icon" />
        <span>Start Recording</span>
      </button>
      
      <button
        type="button"
        onClick={onStop}
        disabled={!isRecording}
        className={`control-button ${!isRecording ? 'disabled' : ''}`}
        aria-label="Stop recording"
      >
        <StopCircle className="icon" />
        <span>Stop Recording</span>
      </button>
    </div>
  );
};

export default AudioControls;