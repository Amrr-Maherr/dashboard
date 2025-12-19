import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const fetchOrders = async ({ pageParam = 0, limit = 10 }) => {
  const skip = pageParam * limit
  const response = await api.get(`/carts?limit=${limit}&skip=${skip}`)
  return {
    data: response.data.carts.map(cart => ({
      id: cart.id,
      header: `Order #${cart.id}`,
      type: cart.userId?.toString() || '0',
      status: cart.total > 500 ? 'Completed' : 'Pending',
      target: (cart.total || 0).toString(),
      limit: cart.products?.length?.toString() || '0',
      reviewer: 'Admin',
    })),
    total: response.data.total,
    limit,
    skip
  }
}

export const useOrders = (pageIndex = 0, pageSize = 10) => {
  return useQuery({
    queryKey: ['orders', pageIndex, pageSize],
    queryFn: () => fetchOrders({ pageParam: pageIndex, limit: pageSize }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    keepPreviousData: true,
  })
}
