export const uploadFile = async (file: File, endpoint: 'transcribe' | 'summarize') => {
    const formData = new FormData()
    formData.append('file', file)
  
    const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
      method: 'POST',
      body: formData
    })
  
    if (!response.ok) throw new Error('Upload failed')
    return response.json()
  }
  
  export const processText = async (query: string) => {
    const response = await fetch('http://localhost:8000/api/rag/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
  
    if (!response.ok) throw new Error('Processing failed')
    return response.json()
  }