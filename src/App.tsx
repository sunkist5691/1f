import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createOrUpdateUserActionCreator,
  postOrEditJobActionCreator,
  postOrEditProfileActionCreator,
  saveAllJobsActionCreator,
} from './store/slices'
import EmployerRoute from './routes/EmployerRoute'
import CandidateRoute from './routes/CandidateRoute'
import CompanyPage from './components/CompanyPage/CompanyPage'
import CompanyPostPage from './components/CompanyPostPage/CompanyPostPage'
import CompanyEditPage from './components/CompanyEditPage/CompanyEditPage'
import CompanyApplicantsPage from './components/CompanyApplicantsPage/CompanyApplicantsPage'
import WatchVideo from './components/WatchVideo/WatchVideo'
import ProfilePage from './components/ProfilePage/ProfilePage'
import ProfileEditPage from './components/ProfileEditPage/ProfileEditPage'
import ProfilePostPage from './components/ProfilePostPage/ProfilePostPage'
import ProfileApplied from './components/ProfileApplied/ProfileApplied'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Confirm from './components/Confirm/Confirm'
import PasswordReset from './components/PasswordReset/PasswordReset'
import AuthService from './service/auth-service'
import UserService from './service/user-service'
import JobService from './service/job-service'
import ProfileService from './service/profile-service'
import styles from './App.module.css'
import { State } from './store/type'
import VideoRecordPage from './components/VideoRecordPage/VideoRecordPage'
import VideoPreviewPage from './components/VideoPreviewPage/VideoPreviewPage'

interface Props {
  authService: AuthService
  userService: UserService
  jobService: JobService
  profileService: ProfileService
}

const App: React.FC<Props> = ({
  authService,
  userService,
  jobService,
  profileService,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { job, profile, user } = useSelector((state: State) => state)

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
    const run = async () => {
      if (user && user.role === 'employer') {
        const job = await jobService.get(user)
        if (JSON.stringify(job) === '{}') {
          console.error('App.tsx: No job posted yet')
          return
        }
        dispatch(postOrEditJobActionCreator(job))
      } else if (user && user.role === 'candidate') {
        const profile = await profileService.get(user)
        if (JSON.stringify(profile) === '{}') {
          console.error('App.tsx: No profile posted yet')
          return
        }
        dispatch(postOrEditProfileActionCreator(profile))
      }
    }
    run()
  }, [user, dispatch, jobService, profileService])

  useEffect(() => {
    const run = async () => {
      const allJobs = await jobService.getAll()
      if (allJobs.statusCode === 400) {
        console.error('App.tsx: None of the jobs available yet')
        return
      }
      dispatch(saveAllJobsActionCreator(allJobs))
    }
    run()
  }, [dispatch, jobService, user, job, profile])

  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/password-reset" component={PasswordReset} />
        <EmployerRoute path="/company/post" component={CompanyPostPage} />
        <EmployerRoute path="/company/edit" component={CompanyEditPage} />
        <EmployerRoute path="/company/menu" component={CompanyPage} />
        <EmployerRoute
          path="/company/applicants"
          component={CompanyApplicantsPage}
        />
        <EmployerRoute path="/company/watch-video" component={WatchVideo} />
        <CandidateRoute path="/profile/applied" component={ProfileApplied} />
        <CandidateRoute path="/profile/post" component={ProfilePostPage} />
        <CandidateRoute path="/profile/edit" component={ProfileEditPage} />
        <CandidateRoute path="/profile/menu" component={ProfilePage} />
        <CandidateRoute path="/record-video" component={VideoRecordPage} />
        <CandidateRoute path="/preview-video" component={VideoPreviewPage} />
      </Switch>
    </div>
  )
}

export default App
