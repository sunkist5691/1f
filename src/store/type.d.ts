export interface User {
  id: string
  name: string
  email: string
  role: string
  token: string
}

export interface State {
  user: User | null
}
