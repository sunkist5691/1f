import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { State } from '../../store/type'
import styles from './PasswordReset.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import UserPool from '../../pool/UserPool'

const PasswordReset: React.FC = () => {
  const history = useHistory()
  const user = useSelector((state: State) => state.user)
  const emailRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (user && user.token) history.push('/home')
  }, [history, user])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (emailRef && emailRef.current) {
      const cognitoUser = new CognitoUser({
        Username: emailRef.current.value,
        Pool: UserPool,
      })
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          alert('Successfully updated to new password')
          history.push('/login')
        },
        onFailure: (err) => {
          alert(err)
        },
        inputVerificationCode() {
          const verificationCode = prompt('Please input verification code ', '')
          if (!verificationCode) return
          const newPassword = prompt('Enter new password ', '')
          if (!newPassword) return
          cognitoUser.confirmPassword(verificationCode, newPassword, this)
        },
      })
    }

    if (formRef.current) formRef.current.reset()
  }

  return (
    <div className={styles.login}>
      <div className={styles.login_sub}>
        <Header />
        <div className={styles.login_sub_two}>
          <div className={styles.title}>Reset Password</div>
          <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
            <input
              className={styles.input}
              ref={emailRef}
              type="email"
              placeholder="Email"
            />
            <button className={styles.button}>Next</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PasswordReset
