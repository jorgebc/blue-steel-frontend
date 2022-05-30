import type {ErrorBoundaryComponent, LoaderFunction} from '@remix-run/node'
import type {Campaign} from '~/generated/types'

import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {checkAuth} from '~/utils/auth.server'
import {getCampaigns} from '~/api/campaign.server'
import {AlertError} from '~/components/error/alert-error-boundary'
import {CampaignCard} from '~/components/front/card/campaign'
import {WarningAlert} from '~/components/alert/warning-alert'

type LoaderData = {
  campaigns: Campaign[]
  actualCampaign?: Campaign
  noActualCampaign: boolean
}

export const loader: LoaderFunction = async ({request}) => {
  checkAuth(request)
  const campaigns = await getCampaigns(request)
  const actualCampaign = campaigns.find(campaign => campaign.actual)
  const noActualCampaign = actualCampaign === undefined
  const campaignsToShow = campaigns.filter(campaign => !campaign.actual)
  return json<LoaderData>({
    campaigns: campaignsToShow,
    actualCampaign,
    noActualCampaign,
  })
}

export default function Campaigns() {
  const {campaigns, actualCampaign, noActualCampaign} =
    useLoaderData<LoaderData>()

  return (
    <>
      {campaigns.length === 0 && noActualCampaign ? (
        <div className="mx-2 mt-5 md:col-span-4 md:col-start-2 md:mt-0">
          <WarningAlert message="No existen campañas" show />
        </div>
      ) : (
        <>
          {noActualCampaign ? (
            <WarningAlert
              message="No existe campaña marcada como actual"
              show
            />
          ) : (
            <div className="m-4 grid grid-cols-1">
              <CampaignCard campaign={actualCampaign} />
            </div>
          )}
          <div className="m-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2">
            {campaigns.map(campaign => (
              <CampaignCard campaign={campaign} key={campaign.id} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
  return <AlertError error={error} />
}
