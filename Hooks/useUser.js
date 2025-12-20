import { useQuery } from '@tanstack/react-query'

/**
 * @typedef {Object} Hair
 * @property {string} color
 * @property {string} type
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef {Object} Address
 * @property {string} address
 * @property {string} city
 * @property {Coordinates} coordinates
 * @property {string} postalCode
 * @property {string} state
 */

/**
 * @typedef {Object} Bank
 * @property {string} cardExpire
 * @property {string} cardNumber
 * @property {string} cardType
 * @property {string} currency
 * @property {string} iban
 */

/**
 * @typedef {Object} Company
 * @property {Address} address
 * @property {string} department
 * @property {string} name
 * @property {string} title
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} maidenName
 * @property {number} age
 * @property {string} gender
 * @property {string} email
 * @property {string} phone
 * @property {string} username
 * @property {string} password
 * @property {string} birthDate
 * @property {string} image
 * @property {string} bloodGroup
 * @property {number} height
 * @property {number} weight
 * @property {string} eyeColor
 * @property {Hair} hair
 * @property {string} domain
 * @property {string} ip
 * @property {Address} address
 * @property {string} macAddress
 * @property {string} university
 * @property {Bank} bank
 * @property {Company} company
 * @property {string} ein
 * @property {string} ssn
 * @property {string} userAgent
 */

/**
 * @param {string} userId
 * @returns {import('@tanstack/react-query').UseQueryResult<User>}
 */
export const useUser = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/users/${userId}`)
      const data = await response.json()
      return data
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  })
}
