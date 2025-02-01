export const processAudioData = (audioBuffer: AudioBuffer): Float32Array => {
    const channelData = audioBuffer.getChannelData(0);
    // Process the audio data as needed
    return channelData;
};

export const normalizeAudioData = (data: Float32Array): Float32Array => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    return data.map(value => (value - min) / range);
};