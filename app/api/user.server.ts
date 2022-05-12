import type {LoaderFunction} from '@remix-run/node'
import type {ApolloError} from 'apollo-server-errors'
import type {User} from '~/generated/types'

import {json} from '@remix-run/node'
import {fetchFromGraphQL, gql} from '~/utils/fetchFromGraphql.server'

const getUserQuery = gql`
  query GetUser {
    getUser {
      user {
        name
        imageUrl
      }
    }
  }
`
export type LoaderData = {
  data: {user: User}
  errors?: ApolloError[]
}

export const loader: LoaderFunction = async ({request}) => {
  const user = await getUser(request)
  return json<LoaderData>({
    data: {user},
  })
}

export const getUser = async (request: Request): Promise<User> => {
  return fetchFromGraphQL(request, getUserQuery).then(
    responseData => responseData.data.getUser.user,
  )
}
