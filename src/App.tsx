import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createOrUpdateUserActionCreator,
  postOrEditJobActionCreator,
  saveAllJobsActionCreator,
} from './store/slices'
import EmployerRoute from './routes/EmployerRoute'
import CandidateRoute from './routes/CandidateRoute'
import CompanyPage from './components/CompanyPage/CompanyPage'
import CompanyPostPage from './components/CompanyPostPage/CompanyPostPage'
import CompanyEditPage from './components/CompanyEditPage/CompanyEditPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import AuthService from './service/auth-service'
import UserService from './service/user-service'
import JobService from './service/job-service'
import styles from './App.module.css'
import { State } from './store/type'

interface Props {
  authService: AuthService
  userService: UserService
  jobService: JobService
}

const App: React.FC<Props> = ({ authService, userService, jobService }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.user)

  useEffect(() => {
    authService.checkUser().then(async (user: any) => {
      const foundUser = await userService.getCurrentUser(user)
      console.log('App.tsx / FOUND USER: ', foundUser)
      if (foundUser && foundUser.email) {
        dispatch(
          createOrUpdateUserActionCreator({
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            token: user.idToken.jwtToken,
          }),
        )
      }
    })
  }, [history, dispatch, authService, userService, jobService])

  useEffect(() => {
    if (user && user.role === 'employer') {
      jobService
        .get(user)
        .then(async (res) => {
          dispatch(postOrEditJobActionCreator(res))
        })
        .catch((err) => {
          console.log('App.tsx / Your job is not posted yet: ', err)
        })
    }
  }, [user, dispatch, jobService])

  useEffect(() => {
    jobService
      .getAll()
      .then((res) => {
        dispatch(saveAllJobsActionCreator(res))
      })
      .catch((err) => {
        console.log('App.tsx / None of the job posting available: ', err)
      })
  }, [dispatch, jobService, user])

  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <EmployerRoute path="/company/post" component={CompanyPostPage} />
        <EmployerRoute path="/company/edit" component={CompanyEditPage} />
        <EmployerRoute path="/company/menu" component={CompanyPage} />
        <CandidateRoute path="/profile" component={ProfilePage} />
      </Switch>
    </div>
  )
}

export default App
