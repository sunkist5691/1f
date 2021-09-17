import React from 'react'
import styles from './PostedJobs.module.css'
import PostedSubJob from '../PostedSubJob/PostedSubJob'
import { State } from '../../store/type'
import { useSelector } from 'react-redux'

const PostedJobs = () => {
  const { search, jobAll } = useSelector((state: State) => state)

  const filteredJobs =
    jobAll &&
    jobAll.filter((eachJob) => {
      if (search.trim())
        return Object.values({ ...eachJob, userId: '' })
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      else return true
    })
  return (
    <div className={styles.container}>
      <div className={styles.container_sub}>
        {jobAll && filteredJobs.length
          ? filteredJobs.map((eachJob) => (
              <PostedSubJob key={eachJob.userId} eachJob={eachJob} />
            ))
          : "Sorry we couldn't find any result!"}
      </div>
    </div>
  )
}

export default PostedJobs
