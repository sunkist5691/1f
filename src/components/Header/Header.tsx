import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Header.module.css'
import { ImMenu3, ImMenu4 } from 'react-icons/im'
import { FaRegHandshake } from 'react-icons/fa'
import useWindowSize from '../../hooks/useWindowSize'
import NavLinks from '../NavLinks/NavLinks'

const Header: React.FC = () => {
  const [isMobile, width] = useWindowSize()
  const [open, setOpen] = useState<boolean>(false)
  const history = useHistory()
  const hamburgerOpen = (
    <ImMenu4
      className={styles.hamburger}
      size="3rem"
      onClick={() => setOpen(!open)}
    />
  )
  const hamburgerClose = (
    <ImMenu3
      className={styles.hamburger}
      size="3rem"
      onClick={() => setOpen(!open)}
    />
  )

  const closeMobileMenu = () => setOpen(false)

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={() => history.push('/home')}>
        <FaRegHandshake size="3rem" />
        <span className={styles.title}>Hand Shake</span>
      </div>
      {width <= 600 ? (
        <div className={styles.nav_mobile}>
          <div className={styles.nav_mobile_icon}>
            {open ? hamburgerOpen : hamburgerClose}
          </div>
          {open && (
            <NavLinks isMobile={isMobile} closeMobileMenu={closeMobileMenu} />
          )}
        </div>
      ) : (
        <NavLinks isMobile={isMobile} closeMobileMenu={closeMobileMenu} />
      )}
    </div>
  )
}

export default Header
