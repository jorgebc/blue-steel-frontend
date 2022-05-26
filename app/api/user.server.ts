import type {ApolloError} from 'apollo-server-errors'
import type {UpdateUserInput, User} from '~/generated/types'

import {fetchFromGraphQL} from '~/utils/fetchFromGraphql.server'
import {getUserQuery, updateUserMutation} from './queries/user-queries.server'

export type UserData = {
  data: {user: User}
  errors?: ApolloError[]
}

export const getUser = async (request: Request): Promise<UserData> => {
  return fetchFromGraphQL(request, getUserQuery)
    .then(responseData => responseData.getUser.user)
    .then(user => ({data: {user}}))
}

export const updateUser = async (
  request: Request,
  fields: UpdateUserInput,
): Promise<UserData> => {
  const input = {input: fields}
  return fetchFromGraphQL(request, updateUserMutation, input)
    .then(responseData => responseData.updateUser.user)
    .then(user => ({data: {user}}))
}
