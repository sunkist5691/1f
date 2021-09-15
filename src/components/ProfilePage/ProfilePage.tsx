import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './ProfilePage.module.css'

type TParams = { id: string }

const ProfilePage: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
  const id = match.params.id
  return (
    <div className={styles.container}>
      <Header />
      {`Welcome ${id} Profile Page`}
      <Footer />
    </div>
  )
}

export default ProfilePage
