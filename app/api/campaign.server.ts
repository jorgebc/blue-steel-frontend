import type {LoaderFunction} from '@remix-run/node'
import type {ApolloError} from 'apollo-server-errors'
import type {Campaign} from '~/generated/types'

import {json} from '@remix-run/node'
import {fetchFromGraphQL, gql} from '~/utils/fetchFromGraphql.server'

const getCampaignsQuery = gql`
  query GetCampaigns {
    getCampaigns {
      campaigns {
        id
        name
        description
        imageUrl
        summaries {
          id
          name
          description
          gameDate
          auditingMetadata {
            createdBy {
              name
              imageUrl
            }
            lastModifiedBy {
              name
              imageUrl
            }
            creationDate
            lastModifiedDate
          }
          version
        }
        auditingMetadata {
          createdBy {
            name
            imageUrl
          }
          lastModifiedBy {
            name
            imageUrl
          }
          creationDate
          lastModifiedDate
        }
        version
      }
    }
  }
`

export type LoaderData = {
  data: {campaigns: Campaign[]}
  errors?: ApolloError[]
}

export const loader: LoaderFunction = async ({request}) => {
  const campaigns = await getCampaigns(request)
  return json<LoaderData>({
    data: {campaigns},
  })
}

export const getCampaigns = async (request: Request): Promise<Campaign[]> => {
  return fetchFromGraphQL(request, getCampaignsQuery).then(
    responseData => responseData.data.getCampaigns.campaigns,
  )
}
