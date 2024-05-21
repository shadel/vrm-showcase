// src/contexts/FirebaseServiceContext.tsx
import React, { createContext, ReactNode, useContext } from 'react'
import FirebaseService from '../services/firebaseService'

const FirebaseServiceContext = createContext<FirebaseService | undefined>(undefined)

export const FirebaseServiceProvider = ({ children }: { children: ReactNode }) => {
  const firebaseService = new FirebaseService()
  return (
    <FirebaseServiceContext.Provider value={firebaseService}>
      {children}
    </FirebaseServiceContext.Provider>
  )
}

export const useFirebaseService = (): FirebaseService => {
  const context = useContext(FirebaseServiceContext)
  if (!context) {
    throw new Error('useFirebaseService must be used within a FirebaseServiceProvider')
  }
  return context
}
