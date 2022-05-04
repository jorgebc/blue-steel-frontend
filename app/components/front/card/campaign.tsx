import type {Campaign} from '~/generated/types'

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
            className="mt-2 block transform text-2xl font-semibold text-white transition-colors duration-200 hover:text-gray-600 hover:underline"
          >
            {campaign.name}
          </a>
          <p className="mt-2 text-sm text-gray-300">{campaign.description}</p>
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

//https://s3.amazonaws.com/files.d20.io/images/273771667/ysSt6iwwK95E88nQaZ1_zA/max.jpg?1646346416970
