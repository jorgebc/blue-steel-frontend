import type {ApolloError} from 'apollo-server-errors'

import {getAccessToken} from './auth.server'
import {GRAPHQL_API_URL} from '~/constants/env.server'

/**
 * Fetch from GraphQL endpoint
 * @param {string} query GraphQL query
 * @param {object} variables Query variables
 */
export const fetchFromGraphQL = async (
  request: Request,
  query: string,
  variables?: Record<string, any>,
) => {
  if (!GRAPHQL_API_URL) {
    throw new Error('GRAPHQL_API_URL is required')
  }

  const accessToken = await getAccessToken(request)

  const body: any = {query}
  if (variables) body.variables = variables

  return fetch(GRAPHQL_API_URL, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.errors) {
        throwError(responseData.errors)
      } else {
        return responseData.data
      }
    })
}

function throwError(errors: ApolloError) {
  if (errors.length > 0) {
    const error = new Error()
    error.message = 'Backend errors'
    error.stack = errors.map((err: {message: string}) => err.message).join('\n')
    throw error
  } else {
    const error = new Error()
    error.message = 'Backend errors'
    error.stack = JSON.stringify(errors)
    throw error
  }
}

export const gql = String.raw
