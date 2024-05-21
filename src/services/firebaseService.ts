// src/services/firebaseService.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { VRM } from '@pixiv/three-vrm'

// Define the VRMModel type
type VRMModel = {
  id: string
  name: string
  vrmUrl: string
  vrmObject: VRM | null
}

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export const FirebaseService = {
  async fetchVRMModels(): Promise<VRMModel[]> {
    const querySnapshot = await getDocs(collection(db, 'vrmModels'))
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      if (FirebaseService.isVRMModel(data)) {
        return { id: doc.id, name: data.name, vrmUrl: data.vrmUrl, vrmObject: data.vrmObject }
      } else {
        throw new Error(`Invalid data format for document with id: ${doc.id}`)
      }
    })
  },

  async addVRMModel(name: string, file: File): Promise<VRMModel> {
    const storageRef = ref(storage, `vrmModels/${file.name}`)
    const uploadResult = await uploadBytes(storageRef, file)
    const vrmUrl = await getDownloadURL(uploadResult.ref)
    const docRef = await addDoc(collection(db, 'vrmModels'), { name, vrmUrl, vrmObject: null })
    const newModel: VRMModel = { id: docRef.id, name, vrmUrl, vrmObject: null }
    if (FirebaseService.isVRMModel(newModel)) {
      return newModel
    } else {
      throw new Error(`Invalid data format for added document: ${docRef.id}`)
    }
  },

  async editVRMModel(id: string, updatedModel: Partial<VRMModel>): Promise<void> {
    const docRef = doc(db, 'vrmModels', id)
    if (FirebaseService.isPartialVRMModel(updatedModel)) {
      await updateDoc(docRef, updatedModel)
    } else {
      throw new Error(`Invalid data format for updating document with id: ${id}`)
    }
  },

  async deleteVRMModel(id: string, vrmUrl: string): Promise<void> {
    const docRef = doc(db, 'vrmModels', id)
    await deleteDoc(docRef)
    const storageRef = ref(storage, vrmUrl)
    await deleteObject(storageRef)
  },

  isVRMModel(data: unknown): data is VRMModel {
    return typeof data === 'object' &&
      data !== null &&
      typeof (data as VRMModel).id === 'string' &&
      typeof (data as VRMModel).name === 'string' &&
      typeof (data as VRMModel).vrmUrl === 'string' &&
      ((data as VRMModel).vrmObject === null || (data as VRMModel).vrmObject instanceof VRM)
  },

  isPartialVRMModel(data: unknown): data is Partial<VRMModel> {
    const allowedKeys: (keyof VRMModel)[] = ['name', 'vrmUrl', 'vrmObject']
    return typeof data === 'object' &&
      data !== null &&
      Object.keys(data).every(key => allowedKeys.includes(key as keyof VRMModel) &&
      (typeof (data as Partial<VRMModel>)[key as keyof Partial<VRMModel>] === 'string' || (data as Partial<VRMModel>)[key as keyof Partial<VRMModel>] === null || (data as Partial<VRMModel>)[key as keyof Partial<VRMModel>] instanceof VRM))
  }
}
