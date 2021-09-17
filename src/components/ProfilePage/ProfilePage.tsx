import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ProfileMenuPage from '../ProfileMenuPage/ProfileMenuPage'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './ProfilePage.module.css'

const ProfilePage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  return (
    <div className={styles.container}>
      <Header />
      <ProfileMenuPage />
      <Footer />
    </div>
  )
}

export default ProfilePage
