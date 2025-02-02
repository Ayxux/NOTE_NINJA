export const formatTranscript = (transcript: string): string => {
  return transcript.trim().replace(/\s+/g, ' ');
};

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};