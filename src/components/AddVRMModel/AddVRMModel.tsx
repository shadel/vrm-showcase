// src/components/AddVRMModel/AddVRMModel.tsx
import { useState } from 'react'

interface AddVRMModelProps {
  addVRMModel: (name: string, file: File) => Promise<void>
}

const AddVRMModel = ({ addVRMModel }: AddVRMModelProps) => {
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && file) {
      await addVRMModel(name, file)
      setName('')
      setFile(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          VRM File
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Add VRM Model
      </button>
    </form>
  )
}

export default AddVRMModel
