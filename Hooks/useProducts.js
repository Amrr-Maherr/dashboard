import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const fetchProducts = async ({ pageParam = 0, limit = 10 }) => {
  const skip = pageParam * limit
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`)
  return {
    data: response.data.products.map(product => ({
      id: product.id,
      header: product.title,
      type: product.category,
      status: product.stock > 0 ? "In Stock" : "Out of Stock",
      target: (product.price || 0).toString(),
      limit: (product.discountPercentage || 0).toString(),
      reviewer: product.brand || 'Unknown',
    })),
    total: response.data.total,
    limit,
    skip
  }
}

export const useProducts = (pageIndex = 0, pageSize = 10) => {
  return useQuery({
    queryKey: ['products', pageIndex, pageSize],
    queryFn: () => fetchProducts({ pageParam: pageIndex, limit: pageSize }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    keepPreviousData: true,
  })
}
