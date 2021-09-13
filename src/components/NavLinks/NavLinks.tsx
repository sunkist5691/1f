import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutActionCreator } from '../../store/slices'
import { State } from '../../store/type'
import AuthService from '../../service/auth-service'
import styles from './NavLinks.module.css'

interface Props {
  closeMobile: () => void
  isMobile: boolean | number
}

const NavLinks: React.FC<Props> = ({ isMobile, closeMobile }) => {
  const user = useSelector((state: State) => state.user)
  const dispatch = useDispatch()
  const authService = new AuthService()

  const onLogout = () => {
    authService.logout()
    dispatch(logoutActionCreator(null))
  }

  return (
    <div className={styles.nav}>
      {user && user.token && user.role === 'employer' && (
        <Link
          className={styles.nav_button}
          to={`/employer/${user.id}`}
          onClick={() => isMobile && closeMobile()}
        >
          My Page
        </Link>
      )}
      {user && user.token && user.role === 'candidate' && (
        <Link
          className={styles.nav_button}
          to={`/candidate/${user.id}`}
          onClick={() => isMobile && closeMobile()}
        >
          My Page
        </Link>
      )}
      {user && user.token ? (
        <Link
          className={styles.nav_button}
          to="/login"
          onClick={() => {
            isMobile && closeMobile()
            onLogout()
          }}
        >
          Logout
        </Link>
      ) : (
        <Link
          className={styles.nav_button}
          to="/login"
          onClick={() => isMobile && closeMobile()}
        >
          Login
        </Link>
      )}
      {user && user.token ? (
        <button className={styles.nav_button}>Saved List</button>
      ) : (
        <Link
          className={styles.nav_button}
          to="/signup"
          onClick={() => isMobile && closeMobile()}
        >
          Signup
        </Link>
      )}
    </div>
  )
}

export default NavLinks
