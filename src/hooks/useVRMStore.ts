// src/hooks/useVRMStore.ts
import { useState, useEffect } from 'react'
import { VRMModel } from '../services/interfaces'
import { useFirebaseService } from '../contexts/FirebaseServiceContext'

const useVRMStore = () => {
  const firebaseService = useFirebaseService()
  const [vrmModels, setVrmModels] = useState<VRMModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const models = await firebaseService.fetchVRMModels()
        setVrmModels(models)
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [firebaseService])

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message)
    } else {
      setError('An unknown error occurred')
    }
  }

  const addVRMModel = async (name: string, file: File) => {
    try {
      const newModel = await firebaseService.addVRMModel(name, file)
      setVrmModels((prevModels) => [...prevModels, newModel])
    } catch (err) {
      handleError(err)
    }
  }

  const editVRMModel = async (id: string, updatedModel: Partial<VRMModel>) => {
    try {
      await firebaseService.editVRMModel(id, updatedModel)
      setVrmModels((prevModels) =>
        prevModels.map((model) => (model.id === id ? { ...model, ...updatedModel } : model))
      )
    } catch (err) {
      handleError(err)
    }
  }

  const deleteVRMModel = async (id: string, vrmUrl: string) => {
    try {
      await firebaseService.deleteVRMModel(id, vrmUrl)
      setVrmModels((prevModels) => prevModels.filter((model) => model.id !== id))
    } catch (err) {
      handleError(err)
    }
  }

  return { vrmModels, loading, error, addVRMModel, editVRMModel, deleteVRMModel }
}

export default useVRMStore
