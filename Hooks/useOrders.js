import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const fetchOrders = async () => {
  const response = await api.get('/carts?limit=10')
  return response.data.carts.map(cart => ({
    id: cart.id,
    header: `Order #${cart.id}`,
    type: cart.userId.toString(),
    status: cart.total > 500 ? "Completed" : "Pending",
    target: cart.total.toString(),
    limit: cart.products.length.toString(),
    reviewer: "Admin"
  }))
}

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  })
}
