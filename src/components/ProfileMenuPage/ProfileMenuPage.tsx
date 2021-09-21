import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProfileMenuPage.module.css'

const ProfileMenuPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        <Link className={`${styles.post} ${styles.box}`} to="/profile/post">
          Post Your Profile
        </Link>
        <Link className={`${styles.edit} ${styles.box}`} to="/profile/edit">
          Edit Your Profile
        </Link>
      </div>
    </div>
  )
}

export default ProfileMenuPage
