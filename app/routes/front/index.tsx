import type {ErrorBoundaryComponent, LoaderFunction} from '@remix-run/node'
import type {Campaign} from '~/generated/types'

import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {checkAuth} from '~/utils/auth.server'
import {getCampaigns} from '~/api/campaign.server'
import {AlertError} from '~/components/error/alert-error-boundary'

type LoaderData = {campaigns: Campaign[]}

export const loader: LoaderFunction = async ({request}) => {
  checkAuth(request)
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

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
  return <AlertError error={error} />
}
