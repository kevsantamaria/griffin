import { api } from '@/app/config/base-api'

import type { SitesRepository } from '../repository'
import type {
  GetAllSitesParams,
  CreateSiteParams,
  UpdateSiteParams,
  Site,
  SiteListItem,
} from '../types'

const sites = {
  getAll: async ({ pagination }: GetAllSitesParams): Promise<SiteListItem[]> => {
    const query = pagination ? `?${new URLSearchParams()}` : ''
    return api(`/sites${query}`)
  },

  getById: async (id: number): Promise<Site> => {
    return api(`/sites/${id}`)
  },

  create: async (site: CreateSiteParams): Promise<void> => {
    return api('/sites', {
      method: 'POST',
      json: site,
    })
  },

  update: async (id: number, site: UpdateSiteParams): Promise<void> => {
    return api(`/sites/${id}`, {
      method: 'PATCH',
      json: site,
    })
  },

  delete: async (id: number): Promise<void> => {
    return api(`/sites/${id}`, {
      method: 'DELETE',
    })
  },
} satisfies SitesRepository

export default sites
