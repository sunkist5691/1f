import { useSelector } from 'react-redux'
import { State } from '../../store/type'
import styles from './WatchVideo.module.css'

const WatchVideo = () => {
  const currentVideo = useSelector((state: State) => state.currentVideo)
  console.log(currentVideo)
  // return <div></div>
  return (
    <div className={styles.container}>
      <h1>Watch Interview Video</h1>
      <div style={{ width: '100%', maxWidth: 480, height: 640 }}>
        <video
          src={
            !currentVideo
              ? localStorage.getItem('currentVideo')
              : currentVideo.videoBlob
          }
          width={480}
          height={640}
          controls
        />
      </div>
    </div>
  )
}

export default WatchVideo
