"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useChartData } from "@/Hooks/useChartData"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsPage() {
  const { categories, brands, topProducts, sales, isLoading, error } = useChartData()

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Loading analytics...</div>
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
              <div className="text-lg text-red-500">Error loading analytics</div>
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
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                  <p className="text-muted-foreground">Comprehensive data insights and visualizations</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-6">
                  {/* Orders by User Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Orders by User</CardTitle>
                      <CardDescription>Distribution of orders across users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categories}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Brands Distribution Bar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Products by Brand</CardTitle>
                      <CardDescription>Number of products per brand</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={brands}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                          />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="products" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Top Products by Rating */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Rated Products</CardTitle>
                      <CardDescription>Highest rated products</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topProducts} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis
                            dataKey="name"
                            type="category"
                            width={100}
                            tick={{ fontSize: 10 }}
                          />
                          <Tooltip />
                          <Bar dataKey="rating" fill="#ffc658" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Sales Over Time */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Trends</CardTitle>
                      <CardDescription>Monthly sales and order volume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sales}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#8884d8"
                            strokeWidth={2}
                            name="Sales ($)"
                          />
                          <Line
                            type="monotone"
                            dataKey="orders"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            name="Orders"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 lg:px-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Categories</CardDescription>
                      <CardTitle className="text-2xl">{categories.length}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Brands</CardDescription>
                      <CardTitle className="text-2xl">{brands.length}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Top Products</CardDescription>
                      <CardTitle className="text-2xl">{topProducts.length}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Months Tracked</CardDescription>
                      <CardTitle className="text-2xl">{sales.length}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
