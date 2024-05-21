// src/hooks/useVRMStore.ts
import create from 'zustand'
import { VRM } from '@pixiv/three-vrm'
import { FirebaseService } from '../services/firebaseService'

interface VRMModel {
  id: string
  name: string
  vrmUrl: string
  vrmObject: VRM | null
}

interface VRMStore {
  vrmModels: VRMModel[]
  fetchVRMModels: () => void
  addVRMModel: (name: string, file: File) => void
  editVRMModel: (id: string, updatedModel: Partial<VRMModel>) => void
  deleteVRMModel: (id: string, vrmUrl: string) => void
}

export const useVRMStore = create<VRMStore>((set) => ({
  vrmModels: [],
  fetchVRMModels: async () => {
    const vrmModels = await FirebaseService.fetchVRMModels()
    set({ vrmModels })
  },
  addVRMModel: async (name, file) => {
    const newModel = await FirebaseService.addVRMModel(name, file)
    set((state) => ({ vrmModels: [...state.vrmModels, newModel] }))
  },
  editVRMModel: async (id, updatedModel) => {
    await FirebaseService.editVRMModel(id, updatedModel)
    set((state) => ({
      vrmModels: state.vrmModels.map((model) =>
        model.id === id ? { ...model, ...updatedModel } : model
      ),
    }))
  },
  deleteVRMModel: async (id, vrmUrl) => {
    await FirebaseService.deleteVRMModel(id, vrmUrl)
    set((state) => ({
      vrmModels: state.vrmModels.filter((model) => model.id !== id),
    }))
  },
}))