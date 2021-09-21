import React from 'react'
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

  const onApply = async (e: any) => {
    if (!profile) {
      alert('Please add your profile first before you apply')
      history.push('/profile/post')
    } else {
      const applied = await profileService.addApplied(user, { ...eachJob })
      if (JSON.stringify(applied) === '{}') {
        const applied2 = await jobService.addApplicant(user, eachJob.userId, {
          ...profile,
        })
        console.log('*********', applied2)
        if (JSON.stringify(applied) === '{}') {
          dispatch(addApplicantActionCreator({ ...profile }))
          dispatch(addAppliedActionCreator({ ...eachJob }))
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
            ? 'No experience'
            : `${eachJob.experience_level} years`}
        </p>
        <p>{capitalize(eachJob.description)}</p>
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
  )
}

export default PostedSubJob
