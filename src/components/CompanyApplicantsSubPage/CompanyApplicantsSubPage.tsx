import React from 'react'
import styles from './CompanyApplicantsSubPage.module.css'
import { Profile } from '../../store/type'
import { capitalize } from '../../service/capitalize'
import { countExp } from '../../service/countExp'

interface Props {
  eachApplicant: Profile
}

const CompanyApplicantsSubPage: React.FC<Props> = ({ eachApplicant }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        <p>{capitalize(eachApplicant.name)}</p>
        <p>{eachApplicant.email}</p>
        <p>{capitalize(eachApplicant.city)}</p>
        <p>{capitalize(eachApplicant.hobbies)}</p>
        <p>{eachApplicant.highest_degree}</p>
        <p>{countExp(eachApplicant.experience_level)}</p>
        <p>{eachApplicant.description}</p>
      </div>
    </div>
  )
}

export default CompanyApplicantsSubPage
