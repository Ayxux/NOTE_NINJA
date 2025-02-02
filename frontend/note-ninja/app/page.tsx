"use client"

import { useEffect, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Textarea } from "@/app/components/ui/textarea"
import { FileAudio, FileText, Wand2 } from "lucide-react"
import AudioRecorder from "@/app/components/Audio/AudioRecorder"
import AudioVisualizer from "@/app/components/Audio/AudioVisualizer"
import useWebSocketClient from "@/app/hooks/useWebSocketClient"

export default function NotePage() {
  const [transcription, setTranscription] = useState("")
  const [audioData, setAudioData] = useState<Uint8Array | null>(null)
  const webSocketClient = useWebSocketClient("ws://localhost:8000/ws")  // Replace with your WebSocket URL
  const sendAudio = (data: Uint8Array) => {
    if (webSocketClient) {
      webSocketClient.send(data)
    }
  }

  const handleAudioData = (data: Uint8Array) => {
    setAudioData(data)
    sendAudio(data)
  }

  useEffect(() => {
    console.log('NotePage component mounted');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-transparent bg-clip-text animate-pulse">
            Note Ninja
          </h1>
          <p className="text-gray-400 mt-2">Transform your voice into text with ninja-like precision</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 bg-black/50 border-2 border-[#FF00FF] backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#00FFFF] to-[#0099FF] text-transparent bg-clip-text">
              Input Methods
            </h2>
            <div className="grid gap-4">
              <AudioRecorder onAudioData={handleAudioData} />

              <Button
                variant="outline"
                className="h-16 bg-black text-white border-2 border-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:bg-[#FF00FF]/20 hover:text-[#FF00FF] transition-all duration-300"
              >
                <FileAudio className="w-6 h-6 mr-2" />
                Upload Audio File
              </Button>

              <Button
                variant="outline"
                className="h-16 bg-black text-white border-2 border-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:bg-[#FF00FF]/20 hover:text-[#FF00FF] transition-all duration-300"
              >
                <FileText className="w-6 h-6 mr-2" />
                Upload Text File
              </Button>
            </div>
            <div className="mt-4">
              <AudioVisualizer audioData={audioData} />
            </div>
          </Card>

          <Card className="p-6 bg-black/50 border-2 border-[#00FFFF] backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#00FFFF] to-[#0099FF] text-transparent bg-clip-text">
                Transcription
              </h2>
              <Button
                size="sm"
                className="bg-black text-white border-2 border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:bg-[#00FFFF]/20 hover:text-[#00FFFF] transition-all duration-300"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Process
              </Button>
            </div>
            <Textarea
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              placeholder="Your transcription will appear here..."
              className="min-h-[200px] bg-black/50 border-2 border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.3)] text-gray-300 placeholder:text-gray-600"
            />
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Supported file formats: .mp3, .wav, .txt</p>
        </div>
      </main>
    </div>
  )
}