import type {Campaign} from '~/generated/types'

import parse from 'html-react-parser'
import ShowMoreText from 'react-show-more-text'

import {toLocalDateTime} from '~/utils/date'
import {Tooltip} from '~/components/tooltip'

export function CampaignCard({campaign}: {campaign: Campaign}) {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-gray-800 shadow-md">
      <img
        className="h-64 w-full object-cover"
        src={campaign.imageUrl}
        alt={`Imagen de la campaña ${campaign.name}`}
      />

      <div className="p-6 hover:opacity-75">
        <a
          href={`campaigns/${campaign.id}`}
          className="mt-2 block transform text-2xl font-semibold text-white transition-colors duration-200 hover:text-gray-600 hover:underline"
        >
          {campaign.name}
        </a>
        {campaign.actual && (
          <div className="text-xs text-gray-400">Campaña actual</div>
        )}
        <div className="mt-2 text-sm text-gray-300">
          <ShowMoreText
            lines={3}
            more="Mostrar más"
            less="Mostrar menos"
            className="content-css"
            anchorClass="text-blue-500"
            expanded={false}
            truncatedEndingComponent={'... '}
          >
            {parse(campaign.description)}
          </ShowMoreText>
        </div>

        <div className="mt-2 text-xs text-gray-400">
          Número de resumenes: {campaign.summaries?.length}
        </div>

        <div className="mt-2">
          <Tooltip message="Última modificación">
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={campaign.auditingMetadata.lastModifiedBy.imageUrl}
                  alt="Avatar"
                />
                <span className="mx-2 font-semibold text-gray-500">
                  {campaign.auditingMetadata.createdBy.name}
                </span>
              </div>
              <span className="mx-1 text-justify text-xs text-gray-400">
                {toLocalDateTime(campaign.auditingMetadata.lastModifiedDate)}
              </span>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
