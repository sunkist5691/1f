import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import PostedJobs from '../PostedJobs/PostedJobs'
import styles from './Home.module.css'

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <PostedJobs />
      <Footer />
    </div>
  )
}

export default Home
