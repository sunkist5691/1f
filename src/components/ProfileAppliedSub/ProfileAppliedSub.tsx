import React from 'react'
import styles from './ProfileAppliedSub.module.css'
import { Job } from '../../store/type'
import { capitalize } from '../../service/capitalize'
import { countExp } from '../../service/countExp'

interface Props {
  eachJob: Job
}

const ProfileAppliedSub: React.FC<Props> = ({ eachJob }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        <p>{capitalize(eachJob.job_title)}</p>
        <p>{capitalize(eachJob.company)}</p>
        <p>{capitalize(eachJob.city)}</p>
        <p>{capitalize(eachJob.job_type)}</p>
        <p>{countExp(eachJob.experience_level)}</p>
        <p>{eachJob.description}</p>
      </div>
    </div>
  )
}

export default ProfileAppliedSub
