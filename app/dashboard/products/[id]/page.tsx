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
import { ArrowLeft } from "lucide-react"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await api.get(`/products/${productId}`)
      return response.data as Product
    },
    enabled: !!productId,
  })

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
              <div className="text-lg">Loading product details...</div>
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
              <div className="text-lg text-red-500">Error loading product details</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (!product) {
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
              <div className="text-lg">Product not found</div>
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Product Images */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          {product.images.slice(1, 4).map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`${product.title} ${index + 1}`}
                              className="w-full h-20 object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {product.title}
                          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{product.description}</p>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-semibold">Price:</span>
                            <p className="text-2xl font-bold text-green-600">${product.price}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Discount:</span>
                            <p>{product.discountPercentage}%</p>
                          </div>
                          <div>
                            <span className="font-semibold">Rating:</span>
                            <p>⭐ {product.rating}/5</p>
                          </div>
                          <div>
                            <span className="font-semibold">Stock:</span>
                            <p>{product.stock} units</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-semibold">Brand:</span>
                            <p>{product.brand}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Category:</span>
                            <Badge variant="outline">{product.category}</Badge>
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
