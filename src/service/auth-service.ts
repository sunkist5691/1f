import UserPool from '../pool/UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

export default class AuthService {
  async authentication(email: string, password: string) {
    return await new Promise((res, rej) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      })

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      })

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          res(data)
        },
        onFailure: (err) => {
          rej(err)
        },
        newPasswordRequired: (data) => {
          res(data)
        },
      })
    })
  }

  async checkUser() {
    return await new Promise((res, rej) => {
      const user = UserPool.getCurrentUser()
      if (user) {
        user.getSession((err: any, session: any) =>
          err ? rej(err) : res(session),
        )
      } else {
        console.log('Please log in')
        rej()
      }
    })
  }

  login(email: string, password: string) {
    return this.authentication(email, password)
  }

  logout() {
    const user = UserPool.getCurrentUser()
    console.log(user)
    user && user.signOut()
  }
}
