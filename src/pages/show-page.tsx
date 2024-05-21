// src/pages/show-page.tsx
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

  const videoRef = usePoseController(videoFile as File, vrm)

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
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Show VRM Model</h1>
      <VRMSelector onSelect={handleSelectVRM} />
      {selectedVRMUrl && (
        <>
          <VRMDisplay vrmUrl={selectedVRMUrl} onLoad={handleVRMLoaded} />
          <VideoUploader onUpload={handleVideoUpload} />
          {videoFile && vrm && <video ref={videoRef} className="w-full h-full" />}
        </>
      )}
    </div>
  )
}

export default ShowPage
