import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Header.module.css'
import { ImMenu3, ImMenu4 } from 'react-icons/im'
import { FaRegHandshake } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { searchWordActionCreator } from '../../store/slices'
import useWindowSize from '../../hooks/useWindowSize'
import useOutsideAlert from '../../hooks/useOutsideAlert'
import NavLinks from '../NavLinks/NavLinks'
import { State } from '../../store/type'

const Header: React.FC = () => {
  const searchWord = useSelector((state: State) => state.search)
  const [isMobile, width] = useWindowSize()
  const { close, ref } = useOutsideAlert(false)
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>(searchWord)
  const [searchOn, setSearchOn] = useState<boolean>(false)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const history = useHistory()
  const dispatch = useDispatch()

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

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchRef.current && searchRef.current.select()
      dispatch(searchWordActionCreator(search))
      history.push('/home')
    }
  }

  const onClick = (e: any) => {
    searchRef.current && searchRef.current.select()
    dispatch(searchWordActionCreator(search))
    history.push('/home')
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
                <input
                  ref={searchRef}
                  className={styles.searchBar}
                  type="text"
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  value={search}
                  placeholder="Search Company"
                />
                <div className={styles.search_icon_big} onClick={onClick}>
                  <AiOutlineSearch size="2.2rem" color="grey" />
                </div>
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
          <input
            ref={searchRef}
            className={styles.searchBar}
            type="text"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={search}
            placeholder="Search Company"
          />
          <div className={styles.search_icon_big} onClick={onClick}>
            <AiOutlineSearch size="2.2rem" color="grey" />
          </div>
        </div>
      )}

      {width <= 1330 ? (
        <div className={styles.nav_mobile} ref={ref}>
          <div className={styles.nav_mobile_icon}>
            {open && !close ? hamburgerOpen : hamburgerClose}
          </div>
          {open && !close && (
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
