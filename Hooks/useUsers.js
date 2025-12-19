import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * @typedef {Object} Company
 * @property {string} department
 * @property {string} title
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {number} age
 * @property {Company} [company]
 */

/**
 * @typedef {Object} UsersResponse
 * @property {User[]} users
 * @property {number} total
 * @property {number} skip
 * @property {number} limit
 */

/**
 * @typedef {Object} FormattedUser
 * @property {number} id
 * @property {string} header
 * @property {string} type
 * @property {string} status
 * @property {string} target
 * @property {string} limit
 * @property {string} reviewer
 */

/**
 * @typedef {Object} PaginatedUsersResponse
 * @property {FormattedUser[]} data
 * @property {number} total
 * @property {number} limit
 * @property {number} skip
 */

/**
 * @param {Object} params
 * @param {number} params.pageParam
 * @param {number} params.limit
 * @returns {Promise<PaginatedUsersResponse>}
 */
const fetchUsers = async ({ pageParam = 0, limit = 10 }) => {
  const skip = pageParam * limit
  const response = await api.get(`/users?limit=${limit}&skip=${skip}`)
  /** @type {UsersResponse} */
  const data = response.data

  return {
    data: data.users.map(user => ({
      id: user.id,
      header: `${user.firstName || 'Unknown'} ${user.lastName || 'User'}`,
      type: user.company?.department || 'N/A',
      status: 'Active',
      target: (user.age || 0).toString(),
      limit: user.company?.title || 'N/A',
      reviewer: user.email || 'No email',
    })),
    total: data.total,
    limit,
    skip
  }
}

/**
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @returns {import('@tanstack/react-query').UseQueryResult<PaginatedUsersResponse>}
 */
export const useUsers = (pageIndex = 0, pageSize = 10) => {
  return useQuery({
    queryKey: ['users', pageIndex, pageSize],
    queryFn: () => fetchUsers({ pageParam: pageIndex, limit: pageSize }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    keepPreviousData: true,
  })
}
