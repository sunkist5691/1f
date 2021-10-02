import styles from './VideoPreviewPage.module.css'

interface Props {
  location: any
  history: any
}

const VideoPreviewPage: React.FC<Props> = ({ history, location }) => {
  return (
    <div className={styles.container}>
      <h1>Recorded Video</h1>
      {location.state && location.state.videoBlob && (
        <div style={{ width: '100%', maxWidth: 480, height: 640 }}>
          <video
            src={window.URL.createObjectURL(location.state.videoBlob)}
            width={480}
            height={640}
            controls
          />
        </div>
      )}
      <button onClick={() => history.push('/record-video')}>
        Record Again
      </button>
    </div>
  )
}

export default VideoPreviewPage
