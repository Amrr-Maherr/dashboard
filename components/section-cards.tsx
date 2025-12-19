"use client"

import { useQuery } from '@tanstack/react-query'
import { IconShoppingCart, IconUsers, IconPackage, IconTrendingUp } from "@tabler/icons-react"
import api from '@/lib/api'

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  // Fetch statistics from APIs
  const { data: productsStats } = useQuery({
    queryKey: ['products-stats'],
    queryFn: async () => {
      const response = await api.get('/products')
      return { total: response.data.total, products: response.data.products }
    },
    staleTime: 5 * 60 * 1000,
  })

  const { data: usersStats } = useQuery({
    queryKey: ['users-stats'],
    queryFn: async () => {
      const response = await api.get('/users')
      return { total: response.data.total, users: response.data.users }
    },
    staleTime: 5 * 60 * 1000,
  })

  const { data: ordersStats } = useQuery({
    queryKey: ['orders-stats'],
    queryFn: async () => {
      const response = await api.get('/carts')
      return { total: response.data.total, carts: response.data.carts }
    },
    staleTime: 5 * 60 * 1000,
  })

  // Calculate total revenue from orders
  const totalRevenue = ordersStats?.carts?.reduce((sum, cart) => sum + (cart.total || 0), 0) || 0

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {productsStats?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconPackage className="size-4" />
              Products
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Available products <IconPackage className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total inventory items
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {usersStats?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers className="size-4" />
              Users
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Registered accounts <IconUsers className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Active user base
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {ordersStats?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconShoppingCart className="size-4" />
              Orders
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Completed transactions <IconShoppingCart className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Order management system
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${totalRevenue.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-4" />
              Revenue
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total sales value <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            From all completed orders
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
