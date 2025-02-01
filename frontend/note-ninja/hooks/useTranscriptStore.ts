import { create } from 'zustand';

interface TranscriptState {
  chunks: Array<{ text: string; timestamp: number }>;
  addChunk: (text: string) => void;
  clear: () => void;
}

export const useTranscriptStore = create<TranscriptState>((set) => ({
  chunks: [],
  addChunk: (text) => set((state) => ({
    chunks: [...state.chunks, { text, timestamp: Date.now() }]
  })),
  clear: () => set({ chunks: [] })
}));