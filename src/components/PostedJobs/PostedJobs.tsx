import React from 'react'
import styles from './PostedJobs.module.css'
import PostedSubJob from '../PostedSubJob/PostedSubJob'
import { State } from '../../store/type'
import { BiCommentError } from 'react-icons/bi'
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
        {jobAll && filteredJobs.length ? (
          filteredJobs.map((eachJob) => (
            <PostedSubJob key={eachJob.userId} eachJob={eachJob} />
          ))
        ) : (
          <div className={styles.no_data_container}>
            <div className={styles.no_data_icon}>
              <BiCommentError />
            </div>
            <div className={styles.no_data}>
              Sorry we couldn't find any result
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostedJobs
