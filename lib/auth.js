export const authService = {
  async login(credentials) {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    return response.json()
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
