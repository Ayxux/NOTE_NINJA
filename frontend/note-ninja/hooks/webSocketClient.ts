import { useEffect, useRef } from 'react'

export const useWebSocketClient = (url: string) => {
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket(url)

    return () => {
      ws.current?.close()
    }
  }, [url])

  const send = (data: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(data)
    }
  }

  const onMessage = (callback: (data: string) => void) => {
    if (ws.current) {
      ws.current.onmessage = (event) => {
        callback(event.data)
      }
    }
  }

  return { send, onMessage }
}