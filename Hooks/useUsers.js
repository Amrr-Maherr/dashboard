import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const fetchUsers = async () => {
  const response = await api.get('/users?limit=10')
  return response.data.users.map(user => ({
    id: user.id,
    header: `${user.firstName} ${user.lastName}`,
    type: user.role || "Customer",
    status: "Active",
    target: user.email,
    limit: "Standard",
    reviewer: "Admin"
  }))
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  })
}
