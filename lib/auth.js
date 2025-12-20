import api from './api'

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },



  logout() {
    // Remove token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  },

  getToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      console.log('Getting token:', token)
      return token
    }
    return null
  },

  setToken(token) {
    if (typeof window !== 'undefined') {
      console.log('Setting token:', token)
      localStorage.setItem('auth_token', token)
    }
  },

  isAuthenticated() {
    return !!this.getToken()
  }
}
