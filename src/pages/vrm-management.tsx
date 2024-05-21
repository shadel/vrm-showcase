// pages/vrm-management.tsx
import React from 'react'
import AddVRMModel from '../components/AddVRMModel/AddVRMModel'
import VRMModelList from '../components/VRMModelList/VRMModelList'
import useVRMStore from '../hooks/useVRMStore'

const VRMManagement = () => {
  const { vrmModels, loading, error, addVRMModel, editVRMModel, deleteVRMModel } = useVRMStore()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">VRM Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New VRM Model</h2>
        <AddVRMModel addVRMModel={addVRMModel} />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">VRM Model List</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <VRMModelList
          vrmModels={vrmModels}
          editVRMModel={editVRMModel}
          deleteVRMModel={deleteVRMModel}
        />
      </div>
    </div>
  )
}

export default VRMManagement
