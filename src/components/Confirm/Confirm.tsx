import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createOrUpdateUserActionCreator } from '../../store/slices'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import UserPool from '../../pool/UserPool'
import { State } from '../../store/type'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AuthService from '../../service/auth-service'
import UserService from '../../service/user-service'

import styles from './Confirm.module.css'

const Confirm: React.FC<RouteComponentProps<any>> = ({ history }) => {
  //
  const dispatch = useDispatch()
  const authService = new AuthService()
  const userService = new UserService()
  const confirmCodeRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const preUser = useSelector((state: State) => state.preUser)
  const [preSignUser, setPreSignUser] = useState<any>(null)

  const resendConfirm = () => {
    preSignUser.cognitoUser.resendConfirmationCode(
      async (err: any, result: any) => {
        if (err) {
          alert('Unable to resend code / System Error')
          return
        }
        alert('Successfully sent confirmation code to your email')
      },
    )
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmCodeRef && confirmCodeRef.current)
      preSignUser.cognitoUser.confirmRegistration(
        confirmCodeRef.current.value,
        true,
        async (err: any, result: any) => {
          if (err) {
            alert('Please provide authorized confirm code')
            return
          }
          const newUser = await userService.createUser(preSignUser.userSub, {
            ...preUser,
          })
          if (newUser) {
            // login to AWS
            authService
              .login(preUser.email, preUser.password)
              .then(async (user: any) => {
                dispatch(
                  createOrUpdateUserActionCreator({
                    ...newUser,
                    token: user.idToken.jwtToken,
                  }),
                )
                history.push('/')
              })
              .catch((err) =>
                console.log('Confirm.tsx / UNABLE TO LOGIN: ', err),
              )
          } else console.log('FAILED TO ADD DB / LOGIN')
        },
      )
    if (formRef.current) formRef.current.reset()
  }

  useEffect(() => {
    const dataEmail = { Name: 'email', Value: preUser.email }
    const attributeEmail = new CognitoUserAttribute(dataEmail)
    // add user information into AWS Cognito
    UserPool.signUp(
      preUser.email,
      preUser.password,
      [attributeEmail],
      [],
      async (err, data) => {
        if (err) console.error('COG ERROR: ', err)
        else if (data) {
          console.log('THE DATA ----> ', data)
          setPreSignUser({ userSub: data.userSub, cognitoUser: data.user })
        }
      },
    )
  }, [preUser.email, preUser.password])

  return (
    <div className={styles.confirm}>
      <div className={styles.confirm_sub}>
        <Header />
        <div className={styles.confirm_sub_two}>
          <div className={styles.title}>Confirmation</div>
          <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
            <input
              className={styles.input}
              ref={confirmCodeRef}
              type="text"
              placeholder="Code"
            />
            <button className={styles.button}>Confirm</button>
            <div className={styles.container_confirm}>
              <span className={styles.confirm_link}>
                Haven't received a confirm email?{' '}
              </span>
              <span className={styles.resend_link} onClick={resendConfirm}>
                Resend Confirmation
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Confirm
