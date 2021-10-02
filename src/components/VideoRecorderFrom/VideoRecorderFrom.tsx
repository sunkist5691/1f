import VideoRecorder from 'react-video-recorder'

interface Props {
  history: any
}

const VideoRecorderFrom: React.FC<Props> = ({ history }) => {
  return (
    <VideoRecorder
      isFlipped={false}
      countdownTime={3000}
      mimeType="video/webm;codecs=vp8,opus"
      constraints={{
        audio: true,
        video: {
          width: { exact: 480, ideal: 480 },
          height: { exact: 640, ideal: 640 },
          aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
          resizeMode: 'crop-and-scale',
        },
      }}
      onRecordingComplete={(videoBlob: any) => {
        console.log('videoBlob', videoBlob)
        history.push('/preview-video', { videoBlob })
      }}
    />
  )
}

export default VideoRecorderFrom
