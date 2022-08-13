import axios from 'axios'
import { getAccessToken } from '../utils/localAuth'
import { BASE_API_URL } from './urlApi'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API || BASE_API_URL || 'http://localhost:5000/'
})

// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = getAccessToken()
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default apiClient
