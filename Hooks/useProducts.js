import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {string} category
 * @property {number} stock
 * @property {number} price
 * @property {number} discountPercentage
 * @property {string} brand
 */

/**
 * @typedef {Object} ProductsResponse
 * @property {Product[]} products
 * @property {number} total
 * @property {number} skip
 * @property {number} limit
 */

/**
 * @typedef {Object} FormattedProduct
 * @property {number} id
 * @property {string} header
 * @property {string} type
 * @property {string} status
 * @property {string} target
 * @property {string} limit
 * @property {string} reviewer
 */

/**
 * @typedef {Object} PaginatedProductsResponse
 * @property {FormattedProduct[]} data
 * @property {number} total
 * @property {number} limit
 * @property {number} skip
 */

/**
 * @param {Object} params
 * @param {number} params.pageParam
 * @param {number} params.limit
 * @returns {Promise<PaginatedProductsResponse>}
 */
const fetchProducts = async ({ pageParam = 1, limit = 10 }) => {
  const page = pageParam + 1 // API uses 1-based indexing
  const response = await api.get(`/products?page=${page}&limit=${limit}`)
  /** @type {ProductsResponse} */
  const data = response.data

  return {
    data: data.data.map(product => ({
      id: product.id,
      header: product.title,
      type: product.category?.name || 'Unknown',
      status: product.quantity > 0 ? "In Stock" : "Out of Stock",
      target: (product.price || 0).toString(),
      limit: product.ratingsAverage?.toString() || '0',
      reviewer: product.brand?.name || 'Unknown',
    })),
    total: data.results,
    limit,
    skip: (page - 1) * limit
  }
}

/**
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @returns {import('@tanstack/react-query').UseQueryResult<PaginatedProductsResponse>}
 */
export const useProducts = (pageIndex = 0, pageSize = 10) => {
  return useQuery({
    queryKey: ['products', pageIndex, pageSize],
    queryFn: () => fetchProducts({ pageParam: pageIndex, limit: pageSize }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    keepPreviousData: true,
  })
}
