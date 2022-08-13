import React from 'react'
import { Redirect } from 'react-router-dom'

const PublicRoute = (props) => {
  const currentURL = window.location.hostname
  const url = process.env.REACT_APP_DEFAULT_DOMAIN_URL
  const { hostname: checkDefaultURL } = new URL(url)
  if (props.isAuthenticated) {
    if (checkDefaultURL === currentURL) {
      return <Redirect to='/projects' />
    } else {
      return <Redirect to='/review' />
    }
  } else {
    return <>{props.children}</>
  }
}

export default PublicRoute
