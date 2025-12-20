"use client"

import { useAuth } from "@/Providers/AuthProvider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/Login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return children
}
