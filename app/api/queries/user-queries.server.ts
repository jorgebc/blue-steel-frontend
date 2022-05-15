import {gql} from '~/utils/fetchFromGraphql.server'

export const getUserQuery = gql`
  query GetUser {
    getUser {
      user {
        name
        imageUrl
      }
    }
  }
`

export const updateUserMutation = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        name
        imageUrl
      }
    }
  }
`
