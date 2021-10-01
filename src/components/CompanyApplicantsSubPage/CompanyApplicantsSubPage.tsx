import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './CompanyApplicantsSubPage.module.css'
import { capitalize } from '../../service/capitalize'
import { countExp } from '../../service/countExp'
import ProfileService from '../../service/profile-service'
import JobService from '../../service/job-service'
import { AiFillHome } from 'react-icons/ai'
import {
  MdEmail,
  MdToys,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md'
import { ImClock } from 'react-icons/im'
import { Profile, State } from '../../store/type'
import {
  postOrEditJobActionCreator,
  postOrEditProfileActionCreator,
} from '../../store/slices'

interface Props {
  eachApplicant: Profile
}

const CompanyApplicantSubPage: React.FC<Props> = ({ eachApplicant }) => {
  const [info, setInfo] = useState(false)
  const { user, job } = useSelector((state: State) => state)
  const dispatch = useDispatch()
  const profileService = useMemo(() => new ProfileService(), [])
  const jobService = useMemo(() => new JobService(), [])
  const onRequest = async () => {
    if (job) {
      const requested = await profileService.edit(user, {
        ...eachApplicant,
        applied: [...eachApplicant.applied],
        video_request: eachApplicant.video_request.length
          ? [...eachApplicant.video_request, job]
          : [{ ...job }],
      })
      console.log('REQUESTED:', requested)
      const updateVideoRequestApplicants = job.applicants.map((eachApplicant) =>
        eachApplicant.candidateId === requested.editedProfile.candidateId
          ? { ...requested.editedProfile }
          : eachApplicant,
      )
      const requested2 = await jobService.edit(user, {
        ...job,
        applicants: updateVideoRequestApplicants,
      })
      console.log('REQUESTED 2: ', requested2)
      if (requested.status && requested2.status) {
        dispatch(postOrEditProfileActionCreator({ ...requested.editedProfile }))
        dispatch(postOrEditJobActionCreator({ ...requested2.editedJob }))
        alert('Successfully Request Video Interview')
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
                {countExp(eachApplicant.experience_level)}
              </p>
            </div>
            <div className={styles.job_description_container}>
              <p className={styles.job_description}>
                {capitalize(eachApplicant.description)}
              </p>
            </div>
            <div className={styles.expandButton} onClick={() => setInfo(!info)}>
              <MdKeyboardArrowUp size="30px" />
            </div>
          </>
        ) : (
          <>
            <p className={styles.name}>{capitalize(eachApplicant.name)}</p>
            <div className={styles.city}>
              <div className={styles.city_container}>
                <AiFillHome />
                <p>{capitalize(eachApplicant.city)}</p>
              </div>
              <div className={styles.email_container}>
                <MdEmail />
                <p className={styles.company}>{eachApplicant.email}</p>
              </div>
            </div>
            <div className={styles.hobby_container}>
              <div className={styles.hobby_sub_container}>
                <MdToys className={styles.hobby_icon} />
                <p className={styles.hobby_word}>
                  {capitalize(eachApplicant.hobbies)}
                </p>
              </div>
              <div className={styles.request_status} onClick={onRequest}>
                Request Video Interview
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

export default CompanyApplicantSubPage
