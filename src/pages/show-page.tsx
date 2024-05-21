// pages/show-page.tsx
import { useState } from 'react'
import VRMSelector from '../components/ShowPage/VRMSelector'
import VRMDisplay from '../components/ShowPage/VRMDisplay'
import VideoUploader from '../components/ShowPage/VideoUploader'
import { usePoseController } from '../hooks/usePoseController'
import log from '../utils/logger'
import { VRM } from '@pixiv/three-vrm'

const ShowPage = () => {
  const [selectedVRMUrl, setSelectedVRMUrl] = useState<string>('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [vrm, setVrm] = useState<VRM | null>(null)

  const videoRef = usePoseController(videoFile, vrm)

  const handleSelectVRM = (vrmUrl: string) => {
    setSelectedVRMUrl(vrmUrl)
    log.info('Selected VRM model:', vrmUrl)
  }

  const handleVideoUpload = (file: File) => {
    setVideoFile(file)
    log.info('Uploaded video:', file.name)
  }

  const handleVRMLoaded = (loadedVrm: VRM) => {
    setVrm(loadedVrm)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Show VRM Model</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <VRMSelector onSelect={handleSelectVRM} />
      </div>
      {selectedVRMUrl && (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <VRMDisplay vrmUrl={selectedVRMUrl} onLoad={handleVRMLoaded} />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <VideoUploader onUpload={handleVideoUpload} />
          </div>
          {videoFile && vrm && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <video ref={videoRef} className="w-full h-auto" controls />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ShowPage
