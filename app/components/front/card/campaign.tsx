import type {Campaign} from '~/generated/types'

import parse from 'html-react-parser'
import ShowMoreText from 'react-show-more-text'

export function CampaignCard({campaign}: {campaign: Campaign}) {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
      <img
        className="h-64 w-full object-cover"
        src={campaign.imageUrl}
        alt={`Imagen de la campaña ${campaign.name}`}
      />

      <div className="p-6 hover:opacity-75">
        <div>
          <a
            href={`campaigns/${campaign.id}`}
            className="mt-2 mb-2 block transform text-2xl font-semibold text-white transition-colors duration-200 hover:text-gray-600 hover:underline"
          >
            {campaign.name}
          </a>
          <span className="mt-2 text-sm text-gray-300">
            <ShowMoreText
              /* Default options */
              lines={3}
              more="Mostrar más"
              less="Mostrar menos"
              className="content-css"
              anchorClass="text-blue-500"
              expanded={false}
              // width={280}
              truncatedEndingComponent={'... '}
            >
              {parse(campaign.description)}
            </ShowMoreText>
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                className="h-10 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                alt="Avatar"
              />
              <a href="#" className="mx-2 font-semibold text-gray-500">
                {campaign.auditingMetadata.createdBy.name}
              </a>
            </div>
            <span className="mx-1 text-justify text-xs text-gray-400">
              {campaign.auditingMetadata.lastModifiedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
