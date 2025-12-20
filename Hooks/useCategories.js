import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * @typedef {Object} Category
 * @property {string} _id
 * @property {string} name
 * @property {string} slug
 * @property {string} image
 */

/**
 * @typedef {Object} CategoriesResponse
 * @property {Category[]} data
 * @property {number} results
 */

/**
 * @typedef {Object} PaginatedCategoriesResponse
 * @property {Category[]} data
 * @property {number} total
 * @property {number} limit
 * @property {number} skip
 */

/**
 * @param {Object} params
 * @param {number} params.pageParam
 * @param {number} params.limit
 * @returns {Promise<PaginatedCategoriesResponse>}
 */
const fetchCategories = async ({ pageParam = 1, limit = 10 }) => {
  const page = pageParam + 1 // API uses 1-based indexing
  const response = await api.get(`/categories?page=${page}&limit=${limit}`)
  /** @type {CategoriesResponse} */
  const data = response.data

  return {
    data: data.data,
    total: data.results,
    limit,
    skip: (page - 1) * limit
  }
}

/**
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @returns {import('@tanstack/react-query').UseQueryResult<PaginatedCategoriesResponse>}
 */
export const useCategories = (pageIndex = 0, pageSize = 10) => {
  return useQuery({
    queryKey: ['categories', pageIndex, pageSize],
    queryFn: () => fetchCategories({ pageParam: pageIndex, limit: pageSize }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    keepPreviousData: true,
  })
}
