import React from 'react'
import styles from './CompanyApplicantsPage.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { State } from '../../store/type'
import { useSelector } from 'react-redux'
import { BiCommentError } from 'react-icons/bi'
import CompanyApplicantsSubPage from '../CompanyApplicantsSubPage/CompanyApplicantsSubPage'

const CompanyApplicantsPage = () => {
  const job = useSelector((state: State) => state.job)
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.container_sub}>
        {job && job.applicants.length ? (
          job.applicants.map((eachApplicant) => (
            <CompanyApplicantsSubPage
              key={eachApplicant.candidateId}
              eachApplicant={eachApplicant}
            />
          ))
        ) : (
          <div className={styles.no_data_container}>
            <div className={styles.no_data_icon}>
              <BiCommentError />
            </div>
            <div className={styles.no_data}>No applicants received yet</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default CompanyApplicantsPage
