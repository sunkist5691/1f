import React from 'react'
import AuthService from '../../service/auth-service'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../store/type'
import { logoutActionCreator } from '../../store/slices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const user = useSelector((state: State) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const authService = new AuthService()

  const onLogout = () => {
    authService.logout()
    dispatch(logoutActionCreator(null))
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={() => history.push('/')}>
        <FontAwesomeIcon icon={faHandshake} size="2x" />
        <span className={styles.title}>Hand Shake</span>
      </div>
      <div className={styles.nav}>
        {user && user.token ? (
          <Link className={styles.nav_button} to="/login" onClick={onLogout}>
            Logout
          </Link>
        ) : (
          <Link className={styles.nav_button} to="/login">
            Login
          </Link>
        )}
        {user && user.token ? (
          <button className={styles.nav_button}>Saved List</button>
        ) : (
          <Link className={styles.nav_button} to="/signup">
            Signup
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
