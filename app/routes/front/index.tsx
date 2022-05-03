import type {LoaderFunction} from '@remix-run/node'
import type {Campaign} from '~/generated/types'

import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {auth} from '~/utils/auth.server'
import {getCampaigns} from '~/api/campaign.server'

type LoaderData = {campaigns: Campaign[]}

export const loader: LoaderFunction = async ({request}) => {
  await auth.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const campaigns = await getCampaigns(request)
  return json<LoaderData>({campaigns})
}

export default function FrontHome() {
  const {campaigns} = useLoaderData<LoaderData>()
  return (
    <pre>
      <code>{JSON.stringify(campaigns, null, 2)}</code>
    </pre>
  )
}
