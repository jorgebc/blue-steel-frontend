import {isProduction} from '~/utils'

/**
 * Auth0
 */
export const AUTH0_RETURN_TO_URL = isProduction()
  ? process.env.AUTH0_RETURN_TO_URL!
  : 'http://localhost:3000'

export const AUTH0_CALLBACK_URL = isProduction()
  ? process.env.AUTH0_CALLBACK_URL!
  : 'http://localhost:3000/callback'

export const AUTH0_CLIENT_ID = isProduction()
  ? process.env.AUTH0_CLIENT_ID!
  : process.env.DEV_AUTH0_CLIENT_ID!

export const AUTH0_CLIENT_SECRET = isProduction()
  ? process.env.AUTH0_CLIENT_SECRET!
  : process.env.DEV_AUTH0_CLIENT_SECRET!

export const AUTH0_DOMAIN = isProduction()
  ? process.env.AUTH0_DOMAIN!
  : process.env.DEV_AUTH0_DOMAIN!

export const AUTH0_LOGOUT_URL = isProduction()
  ? process.env.AUTH0_LOGOUT_URL!
  : process.env.DEV_AUTH0_LOGOUT_URL!

export const SECRETS = isProduction()
  ? process.env.SECRETS!
  : process.env.DEV_SECRETS!

/**
 * GraphQL
 */
export const GRAPHQL_API_URL = isProduction()
  ? process.env.GRAPHQL_API_URL!
  : 'http://localhost:8080/graphql'

export const FETCH_TIMEOUT = 9500
