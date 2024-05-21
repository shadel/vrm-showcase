// src/components/ShowPage/VideoUploader.tsx
import { useRef } from 'react'

interface VideoUploaderProps {
  onUpload: (file: File) => void
}

const VideoUploader = ({ onUpload }: VideoUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
      const file = fileInputRef.current.files[0]
      onUpload(file)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload Video
      </button>
    </div>
  )
}

export default VideoUploader
