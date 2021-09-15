import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutActionCreator } from '../../store/slices'
import { State } from '../../store/type'
import AuthService from '../../service/auth-service'
import styles from './NavLinks.module.css'

interface Props {
  closeMobileMenu: () => void
  isMobile: boolean | number
}

const NavLinks: React.FC<Props> = ({ isMobile, closeMobileMenu }) => {
  const user = useSelector((state: State) => state.user)
  const dispatch = useDispatch()
  const authService = new AuthService()

  const onLogout = () => {
    authService.logout()
    dispatch(logoutActionCreator(null))
  }

  return (
    <div className={styles.nav}>
      <Link
        className={styles.nav_button}
        to="/home"
        onClick={() => isMobile && closeMobileMenu()}
      >
        Home
      </Link>
      {user && user.token && user.role === 'employer' && (
        <Link
          className={styles.nav_button}
          to={`/company/menu`}
          onClick={() => isMobile && closeMobileMenu()}
        >
          Job
        </Link>
      )}
      {user && user.token && user.role === 'candidate' && (
        <Link
          className={styles.nav_button}
          to={`/profile/${user.id}`}
          onClick={() => isMobile && closeMobileMenu()}
        >
          Profile
        </Link>
      )}
      {user && user.token ? (
        <Link
          className={styles.nav_button}
          to="/login"
          onClick={() => {
            isMobile && closeMobileMenu()
            onLogout()
          }}
        >
          Logout
        </Link>
      ) : (
        <Link
          className={styles.nav_button}
          to="/login"
          onClick={() => isMobile && closeMobileMenu()}
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
          onClick={() => isMobile && closeMobileMenu()}
        >
          Signup
        </Link>
      )}
    </div>
  )
}

export default NavLinks
