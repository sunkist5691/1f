import React from 'react'
import { State } from '../store/type'
import { useSelector } from 'react-redux'
import { Route, RouteComponentProps } from 'react-router-dom'
import LoadingToRedirect from './LoadingToRedirect'

type TParams = { id: string }

interface Rest {
  path: string
  component: React.FC<RouteComponentProps<TParams>>
}

const EmployerRoute = (rest: Rest) => {
  const user = useSelector((state: State) => state.user)

  return user && user.token && user.role === 'candidate' ? (
    <Route {...rest} />
  ) : (
    <LoadingToRedirect />
  )
}

export default EmployerRoute
