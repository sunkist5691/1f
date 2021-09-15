import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Header.module.css'
import { ImMenu3, ImMenu4 } from 'react-icons/im'
import { FaRegHandshake } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import useWindowSize from '../../hooks/useWindowSize'
import NavLinks from '../NavLinks/NavLinks'

const Header: React.FC = () => {
  const [isMobile, width] = useWindowSize()
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [searchOn, setSearchOn] = useState<boolean>(false)
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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={() => history.push('/home')}>
        <FaRegHandshake size="3rem" />
        <span className={styles.title}>Hand Shake</span>
      </div>
      {width <= 700 ? (
        <>
          {searchOn ? (
            <>
              <div
                className={styles.back_arrow}
                onClick={() => setSearchOn(!searchOn)}
              >
                <IoMdArrowRoundBack size="3rem" />
              </div>
              <div className={styles.search}>
                <AiOutlineSearch size="2.2rem" color="grey" />
                <input
                  className={styles.searchBar}
                  type="text"
                  onChange={onChange}
                  value={search}
                  placeholder="Search Company"
                />
              </div>
            </>
          ) : (
            <>
              <div
                className={styles.search_icon}
                onClick={() => {
                  setSearchOn(!searchOn)
                }}
              >
                <AiOutlineSearch size="2.3rem" color="black" />
              </div>
              <div
                className={styles.logo_copy}
                onClick={() => history.push('/home')}
              >
                <FaRegHandshake size="3rem" />
                <span className={styles.title_copy}>Hand Shake</span>
              </div>
            </>
          )}
        </>
      ) : (
        <div className={styles.search}>
          <AiOutlineSearch size="2.2rem" color="grey" />
          <input
            className={styles.searchBar}
            type="text"
            onChange={onChange}
            value={search}
            placeholder="Search Company"
          />
        </div>
      )}

      {width <= 1330 ? (
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
