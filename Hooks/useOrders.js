import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * @typedef {Object} CartProduct
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {number} quantity
 * @property {number} total
 * @property {number} discountPercentage
 * @property {number} discountedPrice
 */

/**
 * @typedef {Object} Cart
 * @property {number} id
 * @property {CartProduct[]} products
 * @property {number} total
 * @property {number} discountedTotal
 * @property {number} userId
 * @property {number} totalProducts
 * @property {number} totalQuantity
 */

/**
 * @typedef {Object} CartsResponse
 * @property {Cart[]} carts
 * @property {number} total
 * @property {number} skip
 * @property {number} limit
 */

/**
 * @typedef {Object} FormattedOrder
 * @property {number} id
 * @property {string} header
 * @property {string} type
 * @property {string} status
 * @property {string} target
 * @property {string} limit
 * @property {string} reviewer
 */

/**
 * @typedef {Object} PaginatedOrdersResponse
 * @property {FormattedOrder[]} data
 * @property {number} total
 * @property {number} limit
 * @property {number} skip
 */

/**
 * @param {Object} params
 * @param {number} params.pageParam
 * @param {number} params.limit
 * @returns {Promise<PaginatedOrdersResponse>}
 */
const fetchOrders = async ({ pageParam = 1, limit = 10 }) => {
  const page = pageParam + 1 // API uses 1-based indexing
  const response = await api.get(`/orders?page=${page}&limit=${limit}`)
  /** @type {CartsResponse} */
  const data = response.data

  return {
    data: data.data.map(order => ({
      id: order.id,
      header: `Order #${order.id}`,
      type: order.user?.name || order.user?.email || 'Unknown',
      status: order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending',
      target: (order.totalOrderPrice || 0).toString(),
      limit: order.cartItems?.length?.toString() || '0',
      reviewer: 'Admin',
    })),
    total: data.results,
    limit,
    skip: (page - 1) * limit
  }
}

/**
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @returns {import('@tanstack/react-query').UseQueryResult<PaginatedOrdersResponse>}
 */
export const useOrders = (pageIndex = 0, pageSize = 10) => {
  return useQuery({
    queryKey: ['orders', pageIndex, pageSize],
    queryFn: () => fetchOrders({ pageParam: pageIndex, limit: pageSize }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    keepPreviousData: true,
  })
}
