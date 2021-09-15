import React, { useState, useEffect, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrUpdateUserActionCreator } from '../../store/slices'
import { State } from '../../store/type'
import styles from './Login.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AuthService from '../../service/auth-service'
import UserService from '../../service/user-service'

const Login: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.user)
  //
  const [errors, setErrors] = useState<string>('')
  //
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const authService = new AuthService()
  const userService = new UserService()

  useEffect(() => {
    // 만약 유저가 로그인이 되어있다면, homepage 로 redirecting 을 해라
    if (user && user.token) history.push('/home')
  }, [history, user])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value
      const password = passwordRef.current.value

      authService
        .login(email, password)
        .then(async (curUser: any) => {
          const foundUser = await userService.getCurrentUser(curUser)
          if (foundUser && foundUser.email) {
            dispatch(
              createOrUpdateUserActionCreator({
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
                token: curUser.idToken.jwtToken,
              }),
            )
            history.push('/home')
          }
        })
        .catch((err) => setErrors('Incorrect Email and Password'))
    }

    if (formRef.current) formRef.current.reset()
  }
  return (
    <div className={styles.login}>
      <div className={styles.login_sub}>
        <Header />
        <div className={styles.login_sub_two}>
          <div className={styles.title}>Login</div>
          <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
            <input
              className={styles.input}
              ref={emailRef}
              type="email"
              placeholder="Email"
            />
            <input
              className={styles.input}
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
            <button className={styles.button}>Login</button>
            {errors && <p className={styles.error}>{errors}</p>}
            <span className={styles.signup_link}>
              Don't have an account? Signup <Link to="/signup">here</Link>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
