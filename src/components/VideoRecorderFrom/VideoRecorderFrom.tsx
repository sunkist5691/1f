import VideoRecorder from 'react-video-recorder'

interface Props {
  history: any
  location: any
}

const VideoRecorderFrom: React.FC<Props> = ({ history, location }) => {
  return (
    <VideoRecorder
      isFlipped={false}
      countdownTime={3000}
      timeLimit={90000}
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
        history.push('/preview-video', {
          ...location.state,
          videoBlob,
        })
      }}
    />
  )
}

export default VideoRecorderFrom
