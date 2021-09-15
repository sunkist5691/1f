import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { State } from '../../store/type'
import { createOrUpdateUserActionCreator } from '../../store/slices'

import UserPool from '../../pool/UserPool'
import styles from './Signup.module.css'
import AuthService from '../../service/auth-service'
import UserService from '../../service/user-service'
import ValidationService from '../../service/validation-service'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

type Form = {
  name: string
  email: string
  password: string
  confirmedPassword: string
  role: string
}

const Signup: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.user)
  const history = useHistory()
  const authService = new AuthService()
  const validationService = new ValidationService()
  const userService = new UserService()
  //
  const [errors, setErrors] = useState<Form>({
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
    role: '',
  })

  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
    role: '',
  })
  //

  useEffect(() => {
    if (user) history.push('/')
  }, [history, user])

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = validationService.validation(form, setErrors)

    if (isValid) {
      // add user information into AWS Cognito
      UserPool.signUp(form.email, form.password, [], [], async (err, data) => {
        if (err) console.error('COG ERROR: ', err)
        else if (data) {
          const newUser = await userService.createUser(data, form)
          if (newUser) {
            // login to AWS
            authService
              .login(form.email, form.password)
              .then(async (user: any) => {
                console.log('SUCCESS LOGIN: ', user)
                // add user information into Redux Store
                dispatch(
                  createOrUpdateUserActionCreator({
                    ...newUser,
                    token: user.idToken.jwtToken,
                  }),
                )
                history.push('/')
              })
              .catch((err) => console.log('@@@@@@ UNABLE TO LOGIN: ', err))
          } else console.log('FAILED TO ADD DB')
        }
      })
    }
  }

  return (
    <div className={styles.signup}>
      <div className={styles.signup_sub}>
        <Header />
        <div className={styles.signup_sub_two}>
          <div className={styles.title}>Signup</div>
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              className={styles.input}
              name="name"
              type="text"
              placeholder="Name"
              onChange={onChange}
              value={form.name}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              onChange={onChange}
              value={form.email}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChange}
              value={form.password}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
            <input
              className={styles.input}
              name="confirmedPassword"
              type="password"
              placeholder="Confirmed Password"
              onChange={onChange}
              value={form.confirmedPassword}
            />
            {errors.confirmedPassword && (
              <p className={styles.error}>{errors.confirmedPassword}</p>
            )}
            <select
              className={styles.select}
              name="role"
              placeholder="Role"
              onChange={onChange}
            >
              <option hidden defaultValue="">
                Choose your status
              </option>
              <option value="employer">Post a job</option>
              <option value="candidate">Search for job</option>
            </select>
            {errors.role && <p className={styles.error}>{errors.role}</p>}
            <button className={styles.button}>Register</button>
            <span className={styles.login_link}>
              Already have an account? Login <Link to="/login">here</Link>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signup
