import React, { FC, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioVisualizerProps {
  audioData: Uint8Array | null;
}

// Extend the WaveSurfer interface to include loadDecodedBuffer
interface ExtendedWaveSurfer extends WaveSurfer {
  loadDecodedBuffer: (buffer: AudioBuffer) => void;
}

const AudioVisualizer: FC<AudioVisualizerProps> = ({ audioData }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current && !wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#2196f3',
        progressColor: '#1976d2',
        cursorColor: '#1976d2',
        height: 100,
        normalize: true,
      });
    }

    return () => {
      wavesurfer.current?.destroy();
      wavesurfer.current = null;
    };
  }, []);

  useEffect(() => {
    if (wavesurfer.current && audioData) {
      const audioContext = new AudioContext();
      const buffer = audioContext.createBuffer(1, audioData.length, 44100);
      const channelData = buffer.getChannelData(0);
      channelData.set(audioData);
      
      // Cast to ExtendedWaveSurfer so TypeScript recognizes loadDecodedBuffer
      (wavesurfer.current as ExtendedWaveSurfer).loadDecodedBuffer(buffer);
      wavesurfer.current.play();
    }
  }, [audioData]);

  return <div ref={waveformRef} className="audio-visualization" />;
};

export default AudioVisualizer;