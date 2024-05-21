// src/services/interfaces.ts
import { VRM } from '@pixiv/three-vrm'

export interface VRMModel {
  id: string
  name: string
  vrmUrl: string
  vrmObject: VRM | null
}

export interface IFirebaseService {
  fetchVRMModels(): Promise<VRMModel[]>
  addVRMModel(name: string, file: File): Promise<VRMModel>
  editVRMModel(id: string, updatedModel: Partial<VRMModel>): Promise<void>
  deleteVRMModel(id: string, vrmUrl: string): Promise<void>
}

export interface IDataValidator {
  isVRMModel(data: unknown): data is VRMModel
  isPartialVRMModel(data: unknown): data is Partial<VRMModel>
}
