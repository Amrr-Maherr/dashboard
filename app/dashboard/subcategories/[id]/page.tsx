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

export default function SubcategoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const subcategoryId = params.id as string

  const { data: subcategory, isLoading, error } = useQuery({
    queryKey: ['subcategory', subcategoryId],
    queryFn: async () => {
      const response = await api.get(`/subcategories/${subcategoryId}`)
      return response.data.data
    },
    enabled: !!subcategoryId,
  })

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Loading subcategory details...</div>
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
              <div className="text-lg text-red-500">Error loading subcategory details</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (!subcategory) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Subcategory not found</div>
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
                  {/* Subcategory Details */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{subcategory.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <span className="font-semibold">Name:</span>
                            <p>{subcategory.name}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Slug:</span>
                            <Badge variant="outline">{subcategory.slug}</Badge>
                          </div>
                          <div>
                            <span className="font-semibold">Category:</span>
                            <p>{subcategory.category}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Created:</span>
                            <p>{new Date(subcategory.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Updated:</span>
                            <p>{new Date(subcategory.updatedAt).toLocaleDateString()}</p>
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
