type Form = {
  name: string
  email: string
  password: string
  confirmedPassword: string
  role: string
}

export default class UserService {
  async getCurrentUser(user: any) {
    const currentUser = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/users/current-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: user.idToken.jwtToken,
        },
        body: JSON.stringify({ id: user.idToken.payload.sub }),
      },
    )
    const foundUser = await currentUser.json()
    return foundUser
  }

  async createUser(userSub: any, form: Form) {
    const incomingUser = await fetch(
      `${process.env.REACT_APP_PRODUCTION_URL}/users/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userSub,
          name: form.name.toLowerCase(),
          email: form.email.toLowerCase(),
          role: form.role,
        }),
      },
    )
    const newUser = await incomingUser.json()
    return newUser
  }
}
