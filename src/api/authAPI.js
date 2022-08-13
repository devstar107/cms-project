import apiClient from './apiClient'
import { SIGNIN_URL } from './urlApi'
import axios from 'axios'

const signup = ({ email, first_name, last_name, password1, password2 }) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('first_name', first_name)
  formData.append('last_name', last_name)
  formData.append('password1', password1)
  formData.append('password2', password2)
  return apiClient.post(SIGNIN_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const signin = ({ email, password }) => {
  return apiClient.post('/signin/', { email, password })
}

const authSignIn = async ({ email, password }) => {
  return axios
    .post(
        `${process.env.REACT_APP_AUTH_API}/v1/auth/ajax/login`,
        {
          email,
          password,
          client_id: process.env.REACT_APP_CLIENT_ID,
          redirect_url: `${process.env.REACT_APP_DEFAULT_DOMAIN_URL}/projects`
        }
    )
    .then((response) => {
      return {
        status: 200,
        data: {
          ...response.data
        }
      }
    })
    .catch(function (error) {
      console.log('error', error.message)
      return { data: error.message }
    })
}

const authAPI = {
  signup,
  signin,
  authSignIn
}

export default authAPI
