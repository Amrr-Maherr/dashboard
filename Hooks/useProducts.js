import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const fetchProducts = async () => {
  const response = await api.get('/products?limit=10')
  return response.data.products.map(product => ({
    id: product.id,
    header: product.title,
    type: product.category,
    status: product.stock > 0 ? "Active" : "Out of Stock",
    target: product.price.toString(),
    limit: product.stock.toString(),
    reviewer: "Admin"
  }))
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  })
}
