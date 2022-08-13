import React from 'react'
import { Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
  if (props.isAuthenticated == false) return <Redirect to='/login' />
  return <>{props.children}</>
}

export default PrivateRoute
