// __mocks__/mediapipe.js
const POSE_LANDMARKS = {
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
}

class Pose {
  constructor() {
    this.options = {}
    this.onResults = jest.fn()
  }

  setOptions(options) {
    this.options = options
  }

  async send() {
    this.onResults({
      poseLandmarks: Array(33).fill({ x: 0, y: 0, z: 0 }),
    })
  }
}

export { POSE_LANDMARKS, Pose }