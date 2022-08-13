import React from 'react'
import { AuthProvider, AuthService } from 'react-oauth2-pkce'

const authService = new AuthService({
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  provider: process.env.REACT_APP_AUTH_PROVIDER,
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
  scopes: ['openid', 'email']
})

function SecuredApp ({ children }) {
  if (typeof window === 'undefined') return
  return <AuthProvider authService={authService}>{children}</AuthProvider>
}

export default SecuredApp
