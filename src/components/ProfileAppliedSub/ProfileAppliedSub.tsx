import React, { useState } from 'react'
import styles from './ProfileAppliedSub.module.css'
import { Job } from '../../store/type'
import { capitalize } from '../../service/capitalize'
import { countExp } from '../../service/countExp'
import { BsDot } from 'react-icons/bs'
import { MdWork, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { ImClock } from 'react-icons/im'

interface Props {
  eachJob: Job
}

const ProfileAppliedSub: React.FC<Props> = ({ eachJob }) => {
  const [info, setInfo] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        {info ? (
          <>
            <div className={styles.job_experience_container}>
              <ImClock className={styles.clock_icon} />{' '}
              <p className={styles.job_experience_level}>
                {countExp(eachJob.experience_level)}
              </p>
            </div>
            <div className={styles.job_description_container}>
              <p className={styles.job_description}>
                {capitalize(eachJob.description)}
              </p>
            </div>
            <div className={styles.expandButton} onClick={() => setInfo(!info)}>
              <MdKeyboardArrowUp size="30px" />
            </div>
          </>
        ) : (
          <>
            <p className={styles.job_title}>{capitalize(eachJob.job_title)}</p>
            <div className={styles.company_city}>
              <p className={styles.company}>{capitalize(eachJob.company)}</p>
              <div className={styles.city}>
                <BsDot />
                <p>{capitalize(eachJob.city)}</p>
              </div>
            </div>
            <div className={styles.job_type_container}>
              <div className={styles.job_type_sub_container}>
                <MdWork className={styles.work_icon} />
                <p className={styles.job_type_word}>
                  {capitalize(eachJob.job_type)}
                </p>
              </div>
            </div>
            <div className={styles.expandButton} onClick={() => setInfo(!info)}>
              <MdKeyboardArrowDown size="30px" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProfileAppliedSub
