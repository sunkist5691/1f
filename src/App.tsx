import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createOrUpdateUserActionCreator } from './store/slices'
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
import styles from './App.module.css'

interface Props {
  authService: AuthService
  userService: UserService
}

const App: React.FC<Props> = ({ authService, userService }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .checkUser()
      .then(async (user: any) => {
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
      .catch(() => {
        console.error("APP.tsx --- CURRENT USER DOESN'T EXIST")
      })
  }, [history, dispatch, authService, userService])

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
