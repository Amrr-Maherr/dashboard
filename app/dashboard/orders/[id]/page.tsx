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

interface CartProduct {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedPrice: number
  thumbnail: string
}

interface Order {
  id: number
  products: CartProduct[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await api.get(`/carts/${orderId}`)
      return response.data as Order
    },
    enabled: !!orderId,
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
              <div className="text-lg">Loading order details...</div>
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
              <div className="text-lg text-red-500">Error loading order details</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (!order) {
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
              <div className="text-lg">Order not found</div>
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Order Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <span className="font-semibold">Order ID:</span>
                          <p className="text-lg font-bold">#{order.id}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Customer ID:</span>
                          <p>{order.userId}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Total Products:</span>
                          <p>{order.totalProducts}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Total Quantity:</span>
                          <p>{order.totalQuantity}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Status:</span>
                          <Badge variant={order.total > 500 ? "default" : "secondary"} className="ml-2">
                            {order.total > 500 ? "Completed" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Totals */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Totals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Discount:</span>
                          <span className="text-green-600">
                            -${(order.total - order.discountedTotal).toFixed(2)}
                          </span>
                        </div>
                        <hr />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-green-600">${order.discountedTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Statistics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <span className="font-semibold">Average Price per Item:</span>
                          <p>${(order.discountedTotal / order.totalQuantity).toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Discount Percentage:</span>
                          <p>{(((order.total - order.discountedTotal) / order.total) * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <span className="font-semibold">Items per Product:</span>
                          <p>{(order.totalQuantity / order.totalProducts).toFixed(1)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Items */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.products.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.title}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
                              <div>
                                <span className="font-medium">Price:</span>
                                <p>${item.price}</p>
                              </div>
                              <div>
                                <span className="font-medium">Quantity:</span>
                                <p>{item.quantity}</p>
                              </div>
                              <div>
                                <span className="font-medium">Discount:</span>
                                <p>{item.discountPercentage}%</p>
                              </div>
                              <div>
                                <span className="font-medium">Total:</span>
                                <p className="font-semibold">${item.total.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
