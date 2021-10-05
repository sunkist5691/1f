import VideoRecorderFrom from '../VideoRecorderFrom/VideoRecorderFrom'
import styles from './VideoRecordPage.module.css'

interface Props {
  history: any
  location: any
}

const VideoRecordPage: React.FC<Props> = ({ history, location }) => {
  return (
    <div className={styles.container}>
      <h1>Video Record</h1>
      <div style={{ width: '100%', maxWidth: 480, height: 640 }}>
        <VideoRecorderFrom history={history} location={location} />
      </div>
    </div>
  )
}

export default VideoRecordPage
