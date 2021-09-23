import React, { useState } from 'react'
import styles from './CompanyApplicantsSubPage.module.css'
import { capitalize } from '../../service/capitalize'
import { countExp } from '../../service/countExp'
import { AiFillHome } from 'react-icons/ai'
import {
  MdEmail,
  MdToys,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md'
import { ImClock } from 'react-icons/im'
import { Profile } from '../../store/type'

interface Props {
  eachApplicant: Profile
}

const CompanyApplicantSubPage: React.FC<Props> = ({ eachApplicant }) => {
  const [info, setInfo] = useState(false)

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
            <div className={styles.job_type_container}>
              <div className={styles.job_type_sub_container}>
                <MdToys className={styles.work_icon} />
                <p className={styles.job_type_word}>
                  {capitalize(eachApplicant.hobbies)}
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

export default CompanyApplicantSubPage
