"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileAudio, Mic, FileText, Wand2, Square } from "lucide-react"
import { uploadFile, processText } from "@/lib/api"
import { useWebSocketClient } from "@/hooks/webSocketClient"

export default function NotePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const { send, onMessage } = useWebSocketClient("ws://localhost:8000/ws")

  // WebSocket message handler
  useEffect(() => {
    onMessage((data) => {
      setTranscription(prev => prev + " " + data)
    })
  }, [onMessage])

  // Audio recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      setMediaRecorder(recorder)

      recorder.ondataavailable = async (event) => {
        const audioBlob = event.data
        const arrayBuffer = await audioBlob.arrayBuffer()
        const uint8Array = new Uint8Array(arrayBuffer)
        send(uint8Array)
      }

      recorder.start(1000) // Send chunks every second
      setIsRecording(true)
    } catch (err) {
      console.error("Error accessing microphone:", err)
    }
  }

  const stopRecording = () => {
    mediaRecorder?.stop()
    setIsRecording(false)
  }

  // File upload handlers
  const handleFileUpload = async (endpoint: 'transcribe' | 'summarize') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = endpoint === 'transcribe' ? 'audio/*' : 'text/plain'

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const result = await uploadFile(file, endpoint)
        if (endpoint === 'transcribe' && result.transcript) {
          setTranscription(result.transcript)
        } else if (endpoint === 'summarize' && result.summary) {
          setTranscription(result.summary)
        }
      } catch (err) {
        console.error("Upload failed:", err)
      }
    }

    input.click()
  }

  // RAG query handler
  const handleProcess = async () => {
    if (!transcription) return
    
    try {
      const result = await processText(transcription)
      if (result.answer) {
        setTranscription(result.answer)
      }
    } catch (err) {
      console.error("Processing failed:", err)
    }
  }

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
            {/* ... (keep existing input methods header) */}
            <div className="grid gap-4">
              <Button
                variant="outline"
                className={`h-16 bg-black text-white border-2 border-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:bg-[#FF00FF]/20 hover:text-[#FF00FF] transition-all duration-300 ${
                  isRecording ? "bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)]" : ""
                }`}
                onClick={() => isRecording ? stopRecording() : startRecording()}
              >
                {isRecording ? (
                  <>
                    <Square className="w-6 h-6 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>

              <Button
                onClick={() => handleFileUpload('transcribe')}
                variant="outline"
                className="h-16 bg-black text-white border-2 border-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:bg-[#FF00FF]/20 hover:text-[#FF00FF] transition-all duration-300"
              >
                <FileAudio className="w-6 h-6 mr-2" />
                Upload Audio File
              </Button>

              <Button
                onClick={() => handleFileUpload('summarize')}
                variant="outline"
                className="h-16 bg-black text-white border-2 border-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:bg-[#FF00FF]/20 hover:text-[#FF00FF] transition-all duration-300"
              >
                <FileText className="w-6 h-6 mr-2" />
                Upload Text File
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-black/50 border-2 border-[#00FFFF] backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#00FFFF] to-[#0099FF] text-transparent bg-clip-text">
                Transcription
              </h2>
              <Button
                size="sm"
                onClick={handleProcess}
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
