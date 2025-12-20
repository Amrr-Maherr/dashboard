"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function BrandDetailPage() {
  const params = useParams()
  const router = useRouter()
  const brandId = params.id as string

  const { data: brand, isLoading, error } = useQuery({
    queryKey: ['brand', brandId],
    queryFn: async () => {
      const response = await api.get(`/brands/${brandId}`)
      return response.data.data
    },
    enabled: !!brandId,
  })

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Loading brand details...</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg text-red-500">Error loading brand details</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (!brand) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Brand not found</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Brand Logo */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Brand Logo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </CardContent>
                  </Card>

                  {/* Brand Details */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{brand.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <span className="font-semibold">Name:</span>
                            <p>{brand.name}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Slug:</span>
                            <Badge variant="outline">{brand.slug}</Badge>
                          </div>
                          <div>
                            <span className="font-semibold">Created:</span>
                            <p>{new Date(brand.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Updated:</span>
                            <p>{new Date(brand.updatedAt).toLocaleDateString()}</p>
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
