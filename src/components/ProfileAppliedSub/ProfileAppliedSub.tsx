import React from 'react'
import styles from './ProfileAppliedSub.module.css'
import { Job } from '../../store/type'
import { capitalize } from '../../service/capitalize'

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
        <p>
          {eachJob.job_type
            .split('_')
            .map(
              (eachWord) =>
                eachWord.charAt(0).toUpperCase() + eachWord.slice(1),
            )
            .join(' ')}
        </p>
        <p>
          {!Number(eachJob.experience_level)
            ? 'No experience needed'
            : `${eachJob.experience_level} years needed`}
        </p>
        <p>{eachJob.description}</p>
      </div>
    </div>
  )
}

export default ProfileAppliedSub
