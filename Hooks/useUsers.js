import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const fetchUsers = async ({ pageParam = 0, limit = 10 }) => {
  const skip = pageParam * limit
  const response = await api.get(`/users?limit=${limit}&skip=${skip}`)
  return {
    data: response.data.users.map(user => ({
      id: user.id,
      header: `${user.firstName || 'Unknown'} ${user.lastName || 'User'}`,
      type: user.company?.department || 'N/A',
      status: 'Active',
      target: (user.age || 0).toString(),
      limit: user.company?.title || 'N/A',
      reviewer: user.email || 'No email',
    })),
    total: response.data.total,
    limit,
    skip
  }
}

export const useUsers = (pageIndex = 0, pageSize = 10) => {
  return useQuery({
    queryKey: ['users', pageIndex, pageSize],
    queryFn: () => fetchUsers({ pageParam: pageIndex, limit: pageSize }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    keepPreviousData: true,
  })
}
