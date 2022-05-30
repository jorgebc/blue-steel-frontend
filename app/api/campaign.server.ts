import type {LoaderFunction} from '@remix-run/node'
import type {ApolloError} from 'apollo-server-errors'
import type {Campaign} from '~/generated/types'

import {json} from '@remix-run/node'
import {fetchFromGraphQL} from '~/utils/fetchFromGraphql.server'
import {getCampaignsQuery} from './queries/campaign-queries.server'

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
    responseData => responseData.getCampaigns.campaigns,
  )
}
