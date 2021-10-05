import React, { useState, useEffect } from 'react'
import styles from './ProfileAppliedSub.module.css'
import { Job, State } from '../../store/type'
import { useSelector } from 'react-redux'
import { capitalize } from '../../service/capitalize'
import { countExp } from '../../service/countExp'
import { BsDot } from 'react-icons/bs'
import { MdWork, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { ImClock } from 'react-icons/im'
import { useHistory } from 'react-router-dom'

interface Props {
  eachJob: Job
}

const ProfileAppliedSub: React.FC<Props> = ({ eachJob }) => {
  const [videoReceived, setVideoReceived] = useState(false)
  const history = useHistory()
  const [info, setInfo] = useState(false)
  const profile = useSelector((state: State) => state.profile)

  useEffect(() => {
    console.log('WHYYYY:', eachJob)
    if (eachJob.videoReceived) {
      setVideoReceived((prevBool) =>
        eachJob.videoReceived.some((eachVideo) => {
          if (profile && profile.candidateId === eachVideo.candidateId)
            return !prevBool
          return prevBool
        }),
      )
    }
  }, [eachJob, eachJob.videoReceived, profile])

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
              {!videoReceived &&
                profile &&
                profile.video_request.some(
                  (eachRequest) => eachRequest.userId === eachJob.userId,
                ) && (
                  <div
                    className={styles.record_video}
                    onClick={() =>
                      history.push('/record-video', {
                        userId: eachJob.userId,
                        candidateId: profile.candidateId,
                      })
                    }
                  >
                    Start Video Interview
                  </div>
                )}
              {videoReceived && profile && (
                <div className={styles.record_video}>
                  Video Interview Completed
                </div>
              )}
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
