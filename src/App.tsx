import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createOrUpdateUserActionCreator } from './store/slices'
import EmployerRoute from './routes/EmployerRoute'
import EmployerPage from './components/EmployerPage/EmployerPage'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
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
        console.log('FOUND USER: ', foundUser)
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
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <EmployerRoute path="/employer/:id" component={EmployerPage} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
