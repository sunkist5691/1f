import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './Home.module.css'

const Home = () => {
  const [search, setSearch] = useState<string>('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <div className={styles.brand}>Hand Shake</div>
        <div className={styles.search}>
          <FontAwesomeIcon icon={faSearch} size="2x" color="gray" />
          <input
            className={styles.searchBar}
            type="text"
            onChange={onChange}
            value={search}
            placeholder="Search Company"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
