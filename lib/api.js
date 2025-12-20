import axios from 'axios'
import { authService } from './auth'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // For dummyjson.com, don't logout on 401 since they don't support auth
    // if (error.response?.status === 401) {
    //   authService.logout()
    //   // You might want to redirect to login page here
    // }
    return Promise.reject(error)
  }
)

export default api
