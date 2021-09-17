import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AuthService from './service/auth-service'
import UserService from './service/user-service'
import JobService from './service/job-service'
import ProfileService from './service/profile-service'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/slices'

const authService = new AuthService()
const userService = new UserService()
const jobService = new JobService()
const profileService = new ProfileService()

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App
        userService={userService}
        authService={authService}
        jobService={jobService}
        profileService={profileService}
      />
    </Provider>
  </Router>,
  document.getElementById('root'),
)
