import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} description
 * @property {number} quantity
 * @property {number} price
 * @property {string} imageCover
 * @property {string[]} images
 * @property {Object} category
 * @property {Object} brand
 * @property {number} ratingsAverage
 * @property {number} ratingsQuantity
 * @property {number} sold
 * @property {Object[]} subcategory
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @param {string} productId
 * @returns {import('@tanstack/react-query').UseQueryResult<Product>}
 */
export const useProduct = (productId) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await api.get(`/products/${productId}`)
      return response.data.data
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  })
}
