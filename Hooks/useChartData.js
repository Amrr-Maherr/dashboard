import { useQuery } from '@tanstack/react-query'

/**
 * Hook to get chart data for analytics from dummyjson
 */
export const useChartData = () => {
  // Orders (carts) distribution by user
  const ordersByUserQuery = useQuery({
    queryKey: ['chart', 'orders-by-user'],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/carts?limit=100')
      const data = await response.json()
      const carts = data.carts || []

      // Group carts by userId and count
      const userStats = carts.reduce((acc, cart) => {
        const userId = cart.userId
        if (!acc[userId]) {
          acc[userId] = { carts: 0, totalValue: 0 }
        }
        acc[userId].carts += 1
        acc[userId].totalValue += cart.discountedTotal || cart.total
        return acc
      }, {})

      // Convert to chart format
      return Object.entries(userStats)
        .sort(([,a], [,b]) => b.carts - a.carts)
        .slice(0, 10)
        .map(([userId, stats], index) => ({
          name: `User ${userId}`,
          value: stats.carts,
          fill: `hsl(${index * 36}, 70%, 50%)`
        }))
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  // Cart value distribution
  const cartValueQuery = useQuery({
    queryKey: ['chart', 'cart-values'],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/carts?limit=100')
      const data = await response.json()
      const carts = data.carts || []

      // Group carts by value ranges
      const valueRanges = [
        { range: '$0-$100', min: 0, max: 100 },
        { range: '$101-$300', min: 101, max: 300 },
        { range: '$301-$600', min: 301, max: 600 },
        { range: '$601-$1000', min: 601, max: 1000 },
        { range: '$1000+', min: 1001, max: Infinity }
      ]

      const rangeStats = valueRanges.map(range => ({
        name: range.range,
        carts: carts.filter(cart => {
          const value = cart.discountedTotal || cart.total
          return value >= range.min && value <= range.max
        }).length,
        fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
      }))

      return rangeStats.filter(item => item.carts > 0)
    },
    staleTime: 10 * 60 * 1000,
  })

  // Top products by quantity sold
  const topProductsQuery = useQuery({
    queryKey: ['chart', 'top-products'],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/carts?limit=100')
      const data = await response.json()
      const carts = data.carts || []

      // Aggregate product quantities across all carts
      const productStats = {}

      carts.forEach(cart => {
        cart.products.forEach(product => {
          if (!productStats[product.id]) {
            productStats[product.id] = {
              id: product.id,
              title: product.title,
              totalQuantity: 0,
              totalValue: 0
            }
          }
          productStats[product.id].totalQuantity += product.quantity
          productStats[product.id].totalValue += product.total
        })
      })

      return Object.values(productStats)
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, 10)
        .map(product => ({
          name: product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title,
          quantity: product.totalQuantity,
          value: product.totalValue,
        }))
    },
    staleTime: 10 * 60 * 1000,
  })

  // Sales over time based on cart data
  const salesQuery = useQuery({
    queryKey: ['chart', 'sales'],
    queryFn: async () => {
      // Since dummyjson carts don't have dates, we'll create mock monthly data
      // based on cart totals and simulate time series
      const response = await fetch('https://dummyjson.com/carts?limit=100')
      const data = await response.json()
      const carts = data.carts || []

      // Create mock monthly data for the last 6 months
      const months = []
      const now = new Date()
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        months.push({
          month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          sales: 0,
          orders: 0
        })
      }

      // Distribute cart data across months
      carts.forEach((cart, index) => {
        const monthIndex = index % 6
        months[monthIndex].sales += cart.discountedTotal || cart.total
        months[monthIndex].orders += 1
      })

      return months
    },
    staleTime: 10 * 60 * 1000,
  })

  return {
    categories: ordersByUserQuery.data || [], // Using orders by user as categories
    brands: cartValueQuery.data || [], // Using cart value ranges as brands
    topProducts: topProductsQuery.data || [],
    sales: salesQuery.data || [],
    isLoading: ordersByUserQuery.isLoading || cartValueQuery.isLoading || topProductsQuery.isLoading || salesQuery.isLoading,
    error: ordersByUserQuery.error || cartValueQuery.error || topProductsQuery.error || salesQuery.error,
  }
}
