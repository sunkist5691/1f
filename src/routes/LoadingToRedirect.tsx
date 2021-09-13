import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './LoadingToRedirect.module.css'

const LoadingToRedirect: React.FC = () => {
  const [count, setCount] = useState<number>(5)
  const history = useHistory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    count === 0 && history.push('/home')
    console.log(count)
    return () => clearInterval(interval)
  }, [count, history])

  return (
    <div className={styles.redirect}>
      <p>Redirecting you to home page in {count} seconds</p>
    </div>
  )
}

export default LoadingToRedirect
