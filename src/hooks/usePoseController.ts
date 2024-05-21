// src/hooks/usePoseController.ts
import { useRef, useEffect } from 'react'
import { POSE_LANDMARKS } from '@mediapipe/pose'
import { Camera } from '@mediapipe/camera_utils'
import { VRM, VRMSchema } from '@pixiv/three-vrm'
import { PoseService } from '../services/poseService'

export const usePoseController = (videoFile: File | null, vrm: VRM | null) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && videoFile && vrm) {
      const poseService = new PoseService()

      poseService.setOnResultsCallback((results) => {
        if (!results.poseLandmarks) return

        const landmarks = results.poseLandmarks

        // Example to update the VRM model's position and rotation
        const vrmHips = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips)
        if (vrmHips) {
          vrmHips.rotation.x = landmarks[POSE_LANDMARKS.LEFT_HIP].x
          vrmHips.rotation.y = landmarks[POSE_LANDMARKS.LEFT_HIP].y
          vrmHips.rotation.z = landmarks[POSE_LANDMARKS.LEFT_HIP].z
        }

        // Add similar updates for all bones
      })

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await poseService.send(videoRef.current)
          }
        },
        width: 640,
        height: 480,
      })
      camera.start()

      const videoUrl = URL.createObjectURL(videoFile)
      videoRef.current.src = videoUrl
      videoRef.current.play()
    }
  }, [videoFile, vrm])

  return videoRef
}
