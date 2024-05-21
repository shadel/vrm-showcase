// tests/usePoseController.test.tsx
import { renderHook } from '@testing-library/react-hooks'
import { usePoseController } from '../src/hooks/usePoseController'
import { VRM } from '@pixiv/three-vrm'
import { PoseService } from '../src/services/poseService'
import { POSE_LANDMARKS } from '@mediapipe/pose'

jest.mock('@mediapipe/pose')

describe('usePoseController', () => {
  it('should update VRM pose based on video input', async () => {
    const mockVrm = { humanoid: { getBoneNode: jest.fn(() => ({ rotation: {}, position: {} })) } } as unknown as VRM
    const mockVideoFile = new File([''], 'test.mp4', { type: 'video/mp4' })

    const { result } = renderHook(() => usePoseController(mockVideoFile, mockVrm))

    // Simulate video play
    result.current.current!.play()

    // Mock pose detection results
    const poseService = new PoseService()
    poseService.setOnResultsCallback = jest.fn((callback) => {
      callback({
        poseLandmarks: [
          { x: 0, y: 0, z: 0 }, // POSE_LANDMARKS.LEFT_HIP
          { x: 0, y: 0, z: 0 }, // POSE_LANDMARKS.RIGHT_HIP
          { x: 0, y: 0, z: 0 }, // POSE_LANDMARKS.LEFT_SHOULDER
          { x: 0, y: 0, z: 0 }, // POSE_LANDMARKS.RIGHT_SHOULDER
          // ... add more landmarks as needed
        ],
      })
    })

    await poseService.send(result.current.current!)

    // Assert that VRM pose is updated based on mock landmarks
    expect(mockVrm.humanoid.getBoneNode).toHaveBeenCalledWith(VRMSchema.HumanoidBoneName.Hips)
    // Add more assertions for other bones as needed
  })
})