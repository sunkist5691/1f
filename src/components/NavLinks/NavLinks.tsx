import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  logoutActionCreator,
  searchWordActionCreator,
} from '../../store/slices'
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

  const onMobile = () => {
    isMobile && closeMobileMenu()
    dispatch(searchWordActionCreator(''))
  }

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav}>
        <Link className={styles.nav_button} to="/home" onClick={onMobile}>
          Home
        </Link>
        {user && user.token && user.role === 'employer' && (
          <Link
            className={styles.nav_button}
            to={`/company/menu`}
            onClick={onMobile}
          >
            Job
          </Link>
        )}
        {user && user.token && user.role === 'employer' && (
          <Link
            className={styles.nav_button}
            to={`/company/applicants`}
            onClick={onMobile}
          >
            Applicants
          </Link>
        )}
        {user && user.token && user.role === 'candidate' && (
          <>
            <Link
              className={styles.nav_button}
              to={`/profile/menu`}
              onClick={onMobile}
            >
              Profile
            </Link>
            <Link
              className={styles.nav_button}
              to={`/profile/applied`}
              onClick={onMobile}
            >
              Applied
            </Link>
          </>
        )}
        {user && user.token ? (
          <Link
            className={styles.nav_button}
            to="/login"
            onClick={() => {
              onMobile()
              onLogout()
            }}
          >
            Logout
          </Link>
        ) : (
          <Link className={styles.nav_button} to="/login" onClick={onMobile}>
            Login
          </Link>
        )}
        {!user && (
          <Link className={styles.nav_button} to="/signup" onClick={onMobile}>
            Signup
          </Link>
        )}
      </div>
    </div>
  )
}

export default NavLinks
