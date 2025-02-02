import React from 'react';

const TranscriptControls: React.FC = () => {
  return (
    <div className="transcript-controls">
      <button className="control-button">Start Transcript</button>
      <button className="control-button">Stop Transcript</button>
      <button className="control-button">Clear Transcript</button>
    </div>
  );
};

export default TranscriptControls;