import { useState, useEffect, useRef } from 'react';

export const useWebSocketClient = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log('Transcript:', message);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socketRef.current = ws;
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendAudio = (chunk: Uint8Array) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(chunk);
    } else {
      console.error('WebSocket is not open');
    }
  };

  return { sendAudio };
};