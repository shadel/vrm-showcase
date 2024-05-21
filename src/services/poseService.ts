// src/services/poseService.ts
import { Pose, Results } from '@mediapipe/pose'

export class PoseService {
  private pose: Pose

  constructor() {
    this.pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    })
    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })
  }

  setOnResultsCallback(callback: (results: Results) => void) {
    this.pose.onResults(callback)
  }

  async send(image: HTMLVideoElement): Promise<void> {
    await this.pose.send({ image })
  }
}
