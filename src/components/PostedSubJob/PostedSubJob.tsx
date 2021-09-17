import React from 'react'
import { Job, State } from '../../store/type'
import styles from './PostedSubJob.module.css'
import { useSelector } from 'react-redux'

interface Props {
  eachJob: Job
}
const PostedSubJob: React.FC<Props> = ({ eachJob }) => {
  const user = useSelector((state: State) => state.user)
  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        <p>{eachJob.job_title}</p>
        <p>{eachJob.company}</p>
        <p>{eachJob.city}</p>
        <p>{eachJob.job_type}</p>
        <p>{eachJob.experience_level} years</p>
        <p>{eachJob.description}</p>
      </div>
      {user && user.token && user.role === 'candidate' ? (
        <div className={styles.button_group}>
          <button className={styles.button}>Apply</button>
        </div>
      ) : null}
    </div>
  )
}

export default PostedSubJob
