import React, { useState } from 'react'
import { Job, State } from '../../store/type'
import {
  addApplicantActionCreator,
  addAppliedActionCreator,
} from '../../store/slices'
import JobService from '../../service/job-service'
import ProfileService from '../../service/profile-service'
import styles from './PostedSubJob.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { capitalize } from '../../service/capitalize'
import { countExp } from '../../service/countExp'
import { BsDot } from 'react-icons/bs'
import { MdWork, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { ImClock } from 'react-icons/im'

interface Props {
  eachJob: Job
  disabled: boolean
}

const PostedSubJob: React.FC<Props> = ({ eachJob, disabled }) => {
  const { profile, user } = useSelector((state: State) => state)

  const dispatch = useDispatch()
  const history = useHistory()
  const profileService = new ProfileService()
  const jobService = new JobService()
  const [info, setInfo] = useState(false)

  const onApply = async (e: any) => {
    if (!profile) {
      alert('Please add your profile first before you apply')
      history.push('/profile/post')
    } else {
      const applied = await profileService.addApplied(user, {
        ...eachJob,
        applicants: [...eachJob.applicants, { ...profile }],
      })
      if (JSON.stringify(applied) === '{}') {
        const applied2 = await jobService.addApplicant(user, eachJob.userId, {
          ...profile,
          applied: [...profile.applied, { ...eachJob }],
        })
        if (JSON.stringify(applied2) === '{}') {
          dispatch(
            addApplicantActionCreator({
              ...profile,
              applied: [...profile.applied, { ...eachJob }],
            }),
          )
          dispatch(
            addAppliedActionCreator({
              ...eachJob,
              applicants: [...eachJob.applicants, { ...profile }],
            }),
          )
          alert('Successfully applied')
        } else {
          console.log('PostedSubJob.tsx / Cannot apply')
        }
      }
    }
  }

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
              {user && user.token && user.role === 'candidate' ? (
                <div className={styles.button_group}>
                  <button
                    onClick={onApply}
                    className={styles.button}
                    disabled={disabled}
                  >
                    {disabled ? 'In Progress' : 'Apply'}
                  </button>
                </div>
              ) : null}
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

export default PostedSubJob
