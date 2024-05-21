// src/components/VRMModelList/VRMModelList.tsx
import { useState } from 'react'
import { useVRMStore } from '../../hooks/useVRMStore'
import VRMViewer from '../VRMViewer/VRMViewer'
import EditVRMModel from '../EditVRMModel/EditVRMModel'
import { VRMModel } from '../../types'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'
import log from '../../utils/logger'

const VRMModelList = () => {
  const { vrmModels, deleteVRMModel } = useVRMStore()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedModel, setSelectedModel] = useState<VRMModel | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [modelToDelete, setModelToDelete] = useState<VRMModel | null>(null)
  const [viewingVrm, setViewingVrm] = useState<VRM | null>(null)

  const handleDeleteModel = (id: string, vrmUrl: string) => {
    deleteVRMModel(id, vrmUrl)
    log.info('Deleted VRM model with id:', id)
    setConfirmOpen(false)
  }

  const handleEditModel = (model: VRMModel) => {
    setIsEditing(true)
    setSelectedModel(model)
  }

  const handleViewModel = async (vrmModel: VRMModel) => {
    log.info('Viewing VRM model:', vrmModel)
    const loader = new GLTFLoader()
    loader.load(
      vrmModel.vrmUrl,
      (gltf) => {
        VRM.from(gltf).then((vrm) => {
          setViewingVrm(vrm)
        })
      },
      undefined,
      (error) => {
        console.error(error)
      }
    )
  }

  const handleOpenConfirm = (model: VRMModel) => {
    setModelToDelete(model)
    setConfirmOpen(true)
  }

  return (
    <>
      <div className="space-y-4">
        {vrmModels.map((model) => (
          <div key={model.id} className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-2">
            <p className="text-lg font-semibold">{model.name}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditModel(model)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleOpenConfirm(model)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleViewModel(model)}
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditing && selectedModel && (
        <EditVRMModel model={selectedModel} onClose={() => setIsEditing(false)} />
      )}
      {confirmOpen && modelToDelete && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Delete</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Are you sure you want to delete the model {modelToDelete.name}?</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleDeleteModel(modelToDelete.id, modelToDelete.vrmUrl)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {viewingVrm && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <VRMViewer vrm={viewingVrm} />
              <button
                onClick={() => setViewingVrm(null)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VRMModelList
