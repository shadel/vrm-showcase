// src/components/ShowPage/VRMSelector.tsx
import React from 'react'
import useVRMStore from '../../hooks/useVRMStore'

interface VRMSelectorProps {
  onSelect: (vrmUrl: string) => void
}

const VRMSelector = ({ onSelect }: VRMSelectorProps) => {
  const { vrmModels, loading, error } = useVRMStore()

  return (
    <div>
      {loading && <p>Loading VRM models...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {vrmModels.map((model) => (
          <button
            key={model.id}
            onClick={() => onSelect(model.vrmUrl)}
            className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default VRMSelector
