import React from 'react'
import styles from './PostedJobs.module.css'
import PostedSubJob from '../PostedSubJob/PostedSubJob'

import { State } from '../../store/type'
import { useSelector } from 'react-redux'

const PostedJobs = () => {
  const jobAll = useSelector((state: State) => state.jobAll)

  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        {jobAll && jobAll.map((eachJob) => <PostedSubJob eachJob={eachJob} />)}
      </div>
    </div>
  )
}

export default PostedJobs
