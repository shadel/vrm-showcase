// src/pages/vrm-management.tsx
import React from 'react'
import AddVRMModel from '../components/AddVRMModel/AddVRMModel'
import VRMModelList from '../components/VRMModelList/VRMModelList'

const VRMManagement = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">VRM Management</h1>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Add New VRM Model</h2>
        <AddVRMModel />
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-semibold mb-4">VRM Model List</h2>
        <VRMModelList />
      </div>
    </div>
  )
}

export default VRMManagement
