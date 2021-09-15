import React from 'react'
import { Job } from '../../store/type'
import styles from './PostedSubJob.module.css'

interface Props {
  eachJob: Job
}
const PostedSubJob: React.FC<Props> = ({ eachJob }) => {
  return (
    <div className={styles.container}>
      <p>{eachJob.job_title}</p>
      <p>{eachJob.company}</p>
      <p>{eachJob.city}</p>
      <p>{eachJob.job_type}</p>
      <p>{eachJob.experience_level} years</p>
      <p>{eachJob.description}</p>
    </div>
  )
}

export default PostedSubJob
