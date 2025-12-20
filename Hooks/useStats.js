import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * Hook to get total counts for dashboard statistics
 */
export const useStats = () => {
  const productsQuery = useQuery({
    queryKey: ['stats', 'products'],
    queryFn: async () => {
      const response = await api.get('/products?page=1&limit=1')
      return response.data.results
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const categoriesQuery = useQuery({
    queryKey: ['stats', 'categories'],
    queryFn: async () => {
      const response = await api.get('/categories?page=1&limit=1')
      return response.data.results
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const subcategoriesQuery = useQuery({
    queryKey: ['stats', 'subcategories'],
    queryFn: async () => {
      const response = await api.get('/subcategories?page=1&limit=1')
      return response.data.results
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const brandsQuery = useQuery({
    queryKey: ['stats', 'brands'],
    queryFn: async () => {
      const response = await api.get('/brands?page=1&limit=1')
      return response.data.results
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const ordersQuery = useQuery({
    queryKey: ['stats', 'orders'],
    queryFn: async () => {
      const response = await api.get('/orders?page=1&limit=1')
      return response.data.results
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    products: productsQuery.data || 0,
    categories: categoriesQuery.data || 0,
    subcategories: subcategoriesQuery.data || 0,
    brands: brandsQuery.data || 0,
    orders: ordersQuery.data || 0,
    isLoading: productsQuery.isLoading || categoriesQuery.isLoading || subcategoriesQuery.isLoading || brandsQuery.isLoading || ordersQuery.isLoading,
    error: productsQuery.error || categoriesQuery.error || subcategoriesQuery.error || brandsQuery.error || ordersQuery.error,
  }
}
