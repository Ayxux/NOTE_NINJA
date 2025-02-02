import React from 'react';
import { useTranscriptStore } from '../../hooks/useTranscriptStore';

const LiveTranscript: React.FC = () => {
  const { chunks } = useTranscriptStore();

  return (
    <div className="transcript-container">
      {chunks.map((chunk: { text: string }, index: number) => (
        <div key={index} className="transcript-chunk">
          {chunk.text}
        </div>
      ))}
    </div>
  );
};

export default LiveTranscript;