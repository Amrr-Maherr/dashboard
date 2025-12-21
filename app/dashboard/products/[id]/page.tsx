"use client"

import { useParams, useRouter } from "next/navigation"
import { useProduct } from "@/Hooks/useProduct"
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

interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}

interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

interface Product {
  id: string
  title: string
  description: string
  price: number
  quantity: number
  imageCover: string
  images: string[]
  category?: Category
  brand?: Brand
  ratingsAverage: number
  ratingsQuantity: number
  sold: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const { data: product, isLoading, error } = useProduct(productId)

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
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          {product.images.map((image, index) => (
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
                          <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
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
                            <span className="font-semibold">Rating:</span>
                            <p>⭐ {product.ratingsAverage}/5 ({product.ratingsQuantity} reviews)</p>
                          </div>
                          <div>
                            <span className="font-semibold">Quantity:</span>
                            <p>{product.quantity} units</p>
                          </div>
                          <div>
                            <span className="font-semibold">Sold:</span>
                            <p>{product.sold} units</p>
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
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <p>{(product.brand as any)?.name || 'Unknown'}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Category:</span>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <Badge variant="outline">{(product.category as any)?.name || 'Unknown'}</Badge>
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
