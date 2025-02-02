export const uploadFile = async (file: File, endpoint: 'transcribe' | 'summarize') => {
    const formData = new FormData()
    formData.append('file', file)
    console.log("Selected file:", file);
    console.log("File type:", file.type);

    try {
        const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
            method: 'POST',
            body: formData
        })

        if (!response.ok) {
            const errorText = await response.text()
            if (errorText.includes('UnicodeDecodeError')) {
                throw new Error('Upload failed due to encoding issue')
            }
            throw new Error('Upload failed')
        }
        return response.json()
    } catch (error) {
        console.error('Network error:', error)
        if (error instanceof Error) {
            throw new Error('Network error: ' + error.message)
        } else {
            throw new Error('Network error')
        }
    }
}

export const processText = async (query: string) => {
    try {
        const response = await fetch('http://localhost:8000/api/rag/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        })

        if (!response.ok) {
            const errorText = await response.text()
            if (errorText.includes('UnicodeDecodeError')) {
                throw new Error('Processing failed due to encoding issue')
            }
            throw new Error('Processing failed')
        }
        return response.json()
    } catch (error) {
        console.error('Network error:', error)
        throw new Error('Network error: ' + error.message)
    }
}