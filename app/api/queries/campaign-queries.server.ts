import {gql} from '~/utils/fetchFromGraphql.server'

export const getCampaignsQuery = gql`
  query GetCampaigns {
    getCampaigns {
      campaigns {
        id
        name
        description
        imageUrl
        actual
        summaries {
          id
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
      }
    }
  }
`
