import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './Home.module.css'

const Home = () => {
  const [search, setSearch] = useState<string>('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.home}>
        <div className={styles.brand}>Hand Shake</div>
        <div className={styles.search}>
          <AiOutlineSearch size="2.2rem" color="grey" />
          <input
            className={styles.searchBar}
            type="text"
            onChange={onChange}
            value={search}
            placeholder="Search Company"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
