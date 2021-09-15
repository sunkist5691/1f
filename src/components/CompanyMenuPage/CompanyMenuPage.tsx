import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CompanyMenuPage.module.css'

const CompanyMenuPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        <Link className={`${styles.post} ${styles.box}`} to="/company/post">
          Post Company Job
        </Link>
        <Link className={`${styles.edit} ${styles.box}`} to="/company/edit">
          Edit Company Job
        </Link>
      </div>
    </div>
  )
}

export default CompanyMenuPage
