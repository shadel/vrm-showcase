// src/components/ShowPage/VRMDisplay.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMUtils } from '@pixiv/three-vrm'

interface VRMDisplayProps {
  vrmUrl: string
  onLoad: (vrm: VRM) => void
}

const VRMDisplay = ({ vrmUrl, onLoad }: VRMDisplayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30.0, canvasRef.current.width / canvasRef.current.height, 0.1, 20.0)
      camera.position.set(0.0, 1.4, 0.7)
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
      renderer.setSize(canvasRef.current.width, canvasRef.current.height)

      const loader = new GLTFLoader()
      loader.load(
        vrmUrl,
        (gltf) => {
          VRM.from(gltf).then((vrm) => {
            VRMUtils.removeUnnecessaryJoints(vrm.scene)
            scene.add(vrm.scene)
            onLoad(vrm)
          })
        },
        undefined,
        (error) => {
          console.error(error)
        }
      )

      const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    }
  }, [vrmUrl, onLoad])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export default VRMDisplay
