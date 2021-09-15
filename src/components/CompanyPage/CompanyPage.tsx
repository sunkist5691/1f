import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import CompanyMenuPage from '../CompanyMenuPage/CompanyMenuPage'
import styles from './CompanyPage.module.css'

type TParams = { id: string }

const CompanyPage: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
  return (
    <div className={styles.container}>
      <Header />
      <CompanyMenuPage />
      <Footer />
    </div>
  )
}

export default CompanyPage
