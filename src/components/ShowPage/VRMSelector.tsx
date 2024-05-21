// src/components/ShowPage/VRMSelector.tsx
import { useEffect, useState } from 'react'
import { useVRMStore } from '../../hooks/useVRMStore'

interface VRMSelectorProps {
  onSelect: (vrmUrl: string) => void
}

const VRMSelector = ({ onSelect }: VRMSelectorProps) => {
  const { vrmModels } = useVRMStore()
  const [selectedModel, setSelectedModel] = useState<string>('')

  useEffect(() => {
    if (selectedModel) {
      onSelect(selectedModel)
    }
  }, [selectedModel, onSelect])

  return (
    <div className="space-y-4">
      <label htmlFor="vrm-selector" className="block text-sm font-medium text-gray-700">
        Select VRM Model
      </label>
      <select
        id="vrm-selector"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value="" disabled>
          -- Select a VRM Model --
        </option>
        {vrmModels.map((model) => (
          <option key={model.id} value={model.vrmUrl}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default VRMSelector
