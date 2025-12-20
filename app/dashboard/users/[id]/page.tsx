"use client"

import { useParams } from "next/navigation"
import { useUser } from "@/Hooks/useUser"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface Hair {
  color: string
  type: string
}

interface Coordinates {
  lat: number
  lng: number
}

interface Address {
  address: string
  city: string
  coordinates: Coordinates
  postalCode: string
  state: string
}

interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

interface Company {
  address: Address
  department: string
  name: string
  title: string
}

interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
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
  hair: Hair
  domain: string
  ip: string
  address: Address
  macAddress: string
  university: string
  bank: Bank
  company: Company
  ein: string
  ssn: string
  userAgent: string
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const { data: user, isLoading, error } = useUser(userId)

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Loading user details...</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg text-red-500">Error loading user details</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (!user) {
    return (
      <ProtectedRoute>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">User not found</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="floating" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="w-fit"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Users
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* User Image and Basic Info */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>User Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <img
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="text-center">
                          <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                          <p className="text-gray-600">@{user.username}</p>
                          <Badge variant="outline" className="mt-2">
                            {user.company.title}
                          </Badge>
                        </div>
                      </div>
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
                            <p>{user.firstName} {user.maidenName} {user.lastName}</p>
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
                            <span className="font-semibold">Eye Color:</span>
                            <p>{user.eyeColor}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Hair:</span>
                            <p>{user.hair.color} ({user.hair.type})</p>
                          </div>
                          <div>
                            <span className="font-semibold">Height/Weight:</span>
                            <p>{user.height}cm / {user.weight}kg</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <span className="font-semibold">Address:</span>
                            <p>{user.address.address}</p>
                          </div>
                          <div>
                            <span className="font-semibold">City:</span>
                            <p>{user.address.city}, {user.address.state}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Postal Code:</span>
                            <p>{user.address.postalCode}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Coordinates:</span>
                            <p>{user.address.coordinates.lat}, {user.address.coordinates.lng}</p>
                          </div>
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
                            <span className="font-semibold">Title:</span>
                            <p>{user.company.title}</p>
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-semibold">Company Address:</span>
                            <p>{user.company.address.address}, {user.company.address.city}</p>
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
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
