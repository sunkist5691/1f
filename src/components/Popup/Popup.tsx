import React from 'react'
import styles from './Popup.module.css'
interface Props {
  trigger: boolean
  setPopup: any
}

const Popup: React.FC<Props> = ({ trigger, setPopup, children }) => {
  return trigger ? (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setPopup(false)}>
        Close
      </button>
      <div className={styles.container_sub}>{children}</div>
    </div>
  ) : null
}

export default Popup
