import { useEffect, useRef, useState } from 'react';

export default function useWebSocketClient(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const send = (data: Uint8Array) => {
    if (ws.current && isConnected) {
      ws.current.send(data);
    }
  };

  return {
    send,
    isConnected,
    onMessage: (callback: (data: string) => void) => {
      if (ws.current) {
        ws.current.onmessage = (event) => callback(event.data);
      }
    },
  };
}