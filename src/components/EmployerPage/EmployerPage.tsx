import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styles from './EmployerPage.module.css'

type TParams = { id: string }

const EmployerPage: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
  const id = match.params.id
  return <div className={styles.container}>{`Welcome ${id} Employer Page`}</div>
}

export default EmployerPage
