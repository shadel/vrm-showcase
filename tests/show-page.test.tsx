// tests/show-page.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ShowPage from '../src/pages/show-page'
import { VRM } from '@pixiv/three-vrm'

jest.mock('../src/components/ShowPage/VRMSelector', () => () => <div data-testid="vrm-selector">VRM Selector</div>)
jest.mock('../src/components/ShowPage/VRMDisplay', () => ({ vrmUrl, onLoad }) => {
  const mockVrm = { humanoid: { getBoneNode: jest.fn() } } as unknown as VRM
  onLoad(mockVrm)
  return <div data-testid="vrm-display">VRM Display</div>
})
jest.mock('../src/components/ShowPage/VideoUploader', () => ({ onUpload }) => (
  <input data-testid="video-uploader" type="file" onChange={(e) => onUpload(e.target.files[0])} />
))
jest.mock('../src/hooks/usePoseController', () => ({
  usePoseController: jest.fn(() => ({ current: document.createElement('video') })),
}))

describe('ShowPage', () => {
  it('renders VRMSelector and VRMDisplay components', () => {
    render(<ShowPage />)
    expect(screen.getByTestId('vrm-selector')).toBeInTheDocument()
    expect(screen.getByTestId('vrm-display')).toBeInTheDocument()
  })

  it('handles VRM model selection and video upload', () => {
    render(<ShowPage />)

    const mockVideoFile = new File([''], 'test.mp4', { type: 'video/mp4' })
    fireEvent.change(screen.getByTestId('video-uploader'), {
      target: { files: [mockVideoFile] },
    })

    expect(screen.getByTestId('video-uploader')).toBeInTheDocument()
  })
})