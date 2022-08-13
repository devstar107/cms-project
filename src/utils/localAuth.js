const keyAccessToken = process.env.REACT_APP_NAME_TOKEN_JWT || 'token_jwt_ford'

export const getAccessToken = () => {
  return localStorage.getItem(keyAccessToken)
}

export const setAccessToken = (token) => {
  localStorage.setItem(keyAccessToken, token)
}

export const removeAccessToken = () => {
  localStorage.removeItem(keyAccessToken)
}
