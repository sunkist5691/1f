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
import { BsDot } from 'react-icons/bs'
import { MdWork, MdKeyboardArrowDown } from 'react-icons/md'
import Popup from '../Popup/Popup'

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

  const [disBtn, setDisBtn] = useState(false)
  const [popup, setPopup] = useState(false)

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
          setDisBtn(true)
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
                disabled={disabled ? disabled : disBtn}
              >
                {disabled || disBtn ? 'In Progress' : 'Apply'}
              </button>
            </div>
          ) : null}
        </div>
        <div className={styles.expandButton} onClick={() => setPopup(true)}>
          <MdKeyboardArrowDown size="30px" />
        </div>
        <Popup trigger={popup} setPopup={setPopup}>
          <h3>Hello World, I'm Children</h3>
        </Popup>
        {/* <p>{countExp(eachJob.experience_level)}</p> */}
        {/* <p>{capitalize(eachJob.description)}</p> */}
      </div>
    </div>
  )
}

export default PostedSubJob
