// src/components/EditVRMModel/EditVRMModel.tsx
import React, { useState } from 'react'
import { VRMModel } from '../../services/interfaces'
import useVRMStore from '../../hooks/useVRMStore'

interface EditVRMModelProps {
  model: VRMModel
  onClose: () => void
  onSave: (id: string, updatedModel: Partial<VRMModel>) => Promise<void>
}

const EditVRMModel = ({ model, onClose, onSave }: EditVRMModelProps) => {
  const { editVRMModel } = useVRMStore()
  const [name, setName] = useState(model.name)
  const [vrmUrl, setVrmUrl] = useState(model.vrmUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await editVRMModel(model.id, { name, vrmUrl })
    onSave(model.id, { name, vrmUrl })
    onClose()
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Edit VRM Model</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
              <label htmlFor="vrmUrl" className="block text-sm font-medium text-gray-700">
                VRM URL
              </label>
              <input
                type="text"
                id="vrmUrl"
                value={vrmUrl}
                onChange={(e) => setVrmUrl(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditVRMModel
