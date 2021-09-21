import React from 'react'
import styles from './ProfileApplied.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProfileAppliedSub from '../ProfileAppliedSub/ProfileAppliedSub'
import { State } from '../../store/type'
import { useSelector } from 'react-redux'
import { BiCommentError } from 'react-icons/bi'

const ProfileApplied = () => {
  const profile = useSelector((state: State) => state.profile)
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.container_sub}>
        {profile && profile.applied.length ? (
          profile.applied.map((eachJob) => (
            <ProfileAppliedSub key={eachJob.userId} eachJob={eachJob} />
          ))
        ) : (
          <div className={styles.no_data_container}>
            <div className={styles.no_data_icon}>
              <BiCommentError />
            </div>
            <div className={styles.no_data}>No applicants received yet</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProfileApplied
