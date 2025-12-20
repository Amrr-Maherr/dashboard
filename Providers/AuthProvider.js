"use client"

import { createContext, useContext, useState } from 'react'
import { authService } from '@/lib/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      // For dummyjson.com, create a fake token since they don't provide real auth
      const fakeToken = `dummy-token-logged-in`
      authService.setToken(fakeToken)
      setUser(response)
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!authService.getToken()
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
