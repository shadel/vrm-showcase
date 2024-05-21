// src/components/ShowPage/VRMViewer.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { VRM, VRMUtils } from '@pixiv/three-vrm'

const VRMViewer = ({ vrm }: { vrm: VRM }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && vrm) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30.0, canvasRef.current.width / canvasRef.current.height, 0.1, 20.0)
      camera.position.set(0.0, 1.4, 0.7)
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
      renderer.setSize(canvasRef.current.width, canvasRef.current.height)

      VRMUtils.removeUnnecessaryJoints(vrm.scene)
      scene.add(vrm.scene)

      const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    }
  }, [vrm])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export default VRMViewer