import { useEffect, useState } from 'react'

import { API } from 'aws-amplify'

/**
 * When provided with a query, and a variables object, this function makes an API call to the GraphQL api
 * and returns and object with the following shape:
 * {
 *   data: {}, // The data from the api
 *   loading: boolean, // The status if we are loading the request or not
 *   errors: {}, // Any errors returned from the API call
 * }
 *
 * @param {String} query - a GraphQL formatted string to pass to the API call
 * @param {Object} variables - an object of variables to apply to the provided query string
 */
export function useQuery(query, variables) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  console.log("re-rendering")

  useEffect(() => {
    let mounted = true;

    API.graphql({query, variables: variables || {}})
      .then(response => mounted && setData(response && response.data ? response.data : {}))
      .catch(err => mounted && setErrors(err))
      .finally(() => mounted && setLoading(false))

    return () => mounted = false
  }, [query, variables])

  return {
    data,
    loading,
    errors,
  }
}

export default useQuery