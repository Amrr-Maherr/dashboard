"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

interface User {
  id: number
  firstName: string
  lastName: string
  maidenName?: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: {
    color: string
    type: string
  }
  domain: string
  ip: string
  address: {
    address: string
    city: string
    coordinates: {
      lat: number
      lng: number
    }
    postalCode: string
    state: string
  }
  macAddress: string
  university: string
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  company: {
    address: {
      address: string
      city: string
      coordinates: {
        lat: number
        lng: number
      }
      postalCode: string
      state: string
    }
    department: string
    name: string
    title: string
  }
  ein: string
  ssn: string
  userAgent: string
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`)
      return response.data as User
    },
    enabled: !!userId,
  })

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-10">
          <div className="flex items-center justify-center">
            <div className="text-lg">Loading user details...</div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-10">
          <div className="flex items-center justify-center">
            <div className="text-lg text-red-500">Error loading user details</div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!user) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-10">
          <div className="flex items-center justify-center">
            <div className="text-lg">User not found</div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600">@{user.username}</p>
              <Badge variant="outline" className="mt-2">{user.company.title}</Badge>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Full Name:</span>
                    <p>{user.firstName} {user.maidenName ? `${user.maidenName} ` : ''}{user.lastName}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Age:</span>
                    <p>{user.age} years old</p>
                  </div>
                  <div>
                    <span className="font-semibold">Gender:</span>
                    <p>{user.gender}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Birth Date:</span>
                    <p>{user.birthDate}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Blood Group:</span>
                    <p>{user.bloodGroup}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Height/Weight:</span>
                    <p>{user.height}cm / {user.weight}kg</p>
                  </div>
                  <div>
                    <span className="font-semibold">Eye Color:</span>
                    <p>{user.eyeColor}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Hair:</span>
                    <p>{user.hair.color} ({user.hair.type})</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Email:</span>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>
                    <p>{user.phone}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Domain:</span>
                    <p>{user.domain}</p>
                  </div>
                  <div>
                    <span className="font-semibold">IP Address:</span>
                    <p>{user.ip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>{user.address.address}</p>
                  <p>{user.address.city}, {user.address.state} {user.address.postalCode}</p>
                  <p>Coordinates: {user.address.coordinates.lat}, {user.address.coordinates.lng}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Company:</span>
                    <p>{user.company.name}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Department:</span>
                    <p>{user.company.department}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Job Title:</span>
                    <p>{user.company.title}</p>
                  </div>
                  <div>
                    <span className="font-semibold">University:</span>
                    <p>{user.university}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bank Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Card Type:</span>
                    <p>{user.bank.cardType}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Card Number:</span>
                    <p>**** **** **** {user.bank.cardNumber.slice(-4)}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Expires:</span>
                    <p>{user.bank.cardExpire}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Currency:</span>
                    <p>{user.bank.currency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
