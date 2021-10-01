import React, { useState, useRef } from 'react'
import styles from './RecordVideo.module.css'

const RecordVideo = () => {
  const [disableRecord, setDisableRecord] = useState(true)
  const [disablePlay, setDisablePlay] = useState(true)
  const [disableDownload, setDisableDownload] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const onStart = async () => {}
  const onRecord = () => {}
  const onPlay = () => {}
  const onDownload = () => {}

  return (
    <div className={styles.container}>
      <div className={styles.video_container}>
        <video
          ref={videoRef}
          className={styles.recording}
          src=""
          playsInline
          autoPlay
          muted
        ></video>
        <video className={styles.recorded} src="" playsInline loop></video>
      </div>
      <div className={styles.button_container}>
        <button className={styles.start_button} onClick={onStart}>
          Start Camera
        </button>
        <button
          className={styles.record_button}
          onClick={onRecord}
          disabled={disableRecord}
        >
          Record
        </button>
        <button
          className={styles.play_button}
          onClick={onPlay}
          disabled={disablePlay}
        >
          Play
        </button>
        <button
          className={styles.download_button}
          onClick={onDownload}
          disabled={disableDownload}
        >
          Download
        </button>
      </div>
    </div>
  )
}
export default RecordVideo
