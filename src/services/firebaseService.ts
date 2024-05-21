// src/services/firebaseService.ts
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './firebaseConfig'
import { IFirebaseService, VRMModel, IDataValidator } from './interfaces'
import DataValidator from './dataValidator'

class FirebaseService implements IFirebaseService {
  private validator: IDataValidator = new DataValidator()

  async fetchVRMModels(): Promise<VRMModel[]> {
    const querySnapshot = await getDocs(collection(db, 'vrmModels'))
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      if (this.validator.isVRMModel(data)) {
        return { id: doc.id, name: data.name, vrmUrl: data.vrmUrl, vrmObject: data.vrmObject }
      } else {
        throw new Error(`Invalid data format for document with id: ${doc.id}`)
      }
    })
  }

  async addVRMModel(name: string, file: File): Promise<VRMModel> {
    const storageRef = ref(storage, `vrmModels/${file.name}`)
    const uploadResult = await uploadBytes(storageRef, file)
    const vrmUrl = await getDownloadURL(uploadResult.ref)
    const docRef = await addDoc(collection(db, 'vrmModels'), { name, vrmUrl, vrmObject: null })
    const newModel: VRMModel = { id: docRef.id, name, vrmUrl, vrmObject: null }
    if (this.validator.isVRMModel(newModel)) {
      return newModel
    } else {
      throw new Error(`Invalid data format for added document: ${docRef.id}`)
    }
  }

  async editVRMModel(id: string, updatedModel: Partial<VRMModel>): Promise<void> {
    const docRef = doc(db, 'vrmModels', id)
    if (this.validator.isPartialVRMModel(updatedModel)) {
      await updateDoc(docRef, updatedModel)
    } else {
      throw new Error(`Invalid data format for updating document with id: ${id}`)
    }
  }

  async deleteVRMModel(id: string, vrmUrl: string): Promise<void> {
    const docRef = doc(db, 'vrmModels', id)
    await deleteDoc(docRef)
    const storageRef = ref(storage, vrmUrl)
    await deleteObject(storageRef)
  }
}

export default FirebaseService
