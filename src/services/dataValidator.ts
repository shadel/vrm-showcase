// src/services/dataValidator.ts
import { IDataValidator, VRMModel } from './interfaces'
import { VRM } from '@pixiv/three-vrm'

class DataValidator implements IDataValidator {
  isVRMModel(data: unknown): data is VRMModel {
    return typeof data === 'object' &&
      data !== null &&
      typeof (data as VRMModel).id === 'string' &&
      typeof (data as VRMModel).name === 'string' &&
      typeof (data as VRMModel).vrmUrl === 'string' &&
      ((data as VRMModel).vrmObject === null || (data as VRMModel).vrmObject instanceof VRM)
  }

  isPartialVRMModel(data: unknown): data is Partial<VRMModel> {
    const allowedKeys: (keyof VRMModel)[] = ['name', 'vrmUrl', 'vrmObject']
    return typeof data === 'object' &&
      data !== null &&
      Object.keys(data).every(key => allowedKeys.includes(key as keyof VRMModel) &&
      (typeof (data as Partial<VRMModel>)[key as keyof Partial<VRMModel>] === 'string' || (data as Partial<VRMModel>)[key as keyof Partial<VRMModel>] === null || (data as Partial<VRMModel>)[key as keyof Partial<VRMModel>] instanceof VRM))
  }
}

export default DataValidator
