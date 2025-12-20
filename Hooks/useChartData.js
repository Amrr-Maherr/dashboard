import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * Hook to get chart data for analytics
 */
export const useChartData = () => {
  // Categories distribution
  const categoriesQuery = useQuery({
    queryKey: ['chart', 'categories'],
    queryFn: async () => {
      const response = await api.get('/categories?limit=20')
      const categories = Array.isArray(response.data) ? response.data : response.data.data || []

      // Get products count per category
      const categoryStats = await Promise.all(
        categories.slice(0, 10).map(async (cat) => {
          try {
            const productsResponse = await api.get(`/products?category=${cat._id}&limit=1`)
            const count = Array.isArray(productsResponse.data)
              ? productsResponse.data.length
              : productsResponse.data.results || 0
            return {
              name: cat.name,
              value: count,
              fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
            }
          } catch {
            return {
              name: cat.name,
              value: 0,
              fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
            }
          }
        })
      )

      return categoryStats.filter(item => item.value > 0)
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  // Brands distribution
  const brandsQuery = useQuery({
    queryKey: ['chart', 'brands'],
    queryFn: async () => {
      const response = await api.get('/brands?limit=20')
      const brands = Array.isArray(response.data) ? response.data : response.data.data || []

      // Get products count per brand
      const brandStats = await Promise.all(
        brands.slice(0, 10).map(async (brand) => {
          try {
            const productsResponse = await api.get(`/products?brand=${brand._id}&limit=1`)
            const count = Array.isArray(productsResponse.data)
              ? productsResponse.data.length
              : productsResponse.data.results || 0
            return {
              name: brand.name,
              products: count,
              fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
            }
          } catch {
            return {
              name: brand.name,
              products: 0,
              fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
            }
          }
        })
      )

      return brandStats.filter(item => item.products > 0)
    },
    staleTime: 10 * 60 * 1000,
  })

  // Top products by ratings
  const topProductsQuery = useQuery({
    queryKey: ['chart', 'top-products'],
    queryFn: async () => {
      const response = await api.get('/products?limit=20&sort=-ratingsAverage')
      const products = Array.isArray(response.data) ? response.data : response.data.data || []

      return products.slice(0, 10).map(product => ({
        name: product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title,
        rating: product.ratingsAverage || 0,
        price: product.price,
      }))
    },
    staleTime: 10 * 60 * 1000,
  })

  // Sales over time (mock data based on orders)
  const salesQuery = useQuery({
    queryKey: ['chart', 'sales'],
    queryFn: async () => {
      const response = await api.get('/orders?limit=50')
      const orders = Array.isArray(response.data) ? response.data : response.data.data || []

      // Group by month
      const monthlySales = orders.reduce((acc, order) => {
        const date = new Date(order.createdAt)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

        if (!acc[monthKey]) {
          acc[monthKey] = { total: 0, count: 0 }
        }
        acc[monthKey].total += order.totalOrderPrice || 0
        acc[monthKey].count += 1

        return acc
      }, {})

      return Object.entries(monthlySales)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-6) // Last 6 months
        .map(([month, data]) => ({
          month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          sales: data.total,
          orders: data.count,
        }))
    },
    staleTime: 10 * 60 * 1000,
  })

  return {
    categories: categoriesQuery.data || [],
    brands: brandsQuery.data || [],
    topProducts: topProductsQuery.data || [],
    sales: salesQuery.data || [],
    isLoading: categoriesQuery.isLoading || brandsQuery.isLoading || topProductsQuery.isLoading || salesQuery.isLoading,
    error: categoriesQuery.error || brandsQuery.error || topProductsQuery.error || salesQuery.error,
  }
}
