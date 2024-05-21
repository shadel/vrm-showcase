// src/types/index.ts
import { VRM } from '@pixiv/three-vrm'

export interface VRMModel {
  id: string
  name: string
  vrmUrl: string
  vrmObject: VRM | null
}