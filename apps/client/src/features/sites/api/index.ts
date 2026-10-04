import type { PaginationDto, CreateSiteDto, UpdateSiteDto } from '@griffin/schemas'

import { api } from '@/app/config/base-api'

import type { SitesRepository } from '../repository'
import type { Site, SiteListItem } from '../types'

const sites = {
  getAll: async (pagination?: PaginationDto): Promise<SiteListItem[]> => {
    const searchParams = new URLSearchParams()

    if (pagination?.limit !== undefined) searchParams.set('limit', String(pagination.limit))
    if (pagination?.offset !== undefined) searchParams.set('offset', String(pagination.offset))

    const query = searchParams.toString()

    return api(`/sites${query ? `?${query}` : ''}`)
  },

  getById: async (id: number): Promise<Site> => {
    return api(`/sites/${id}`)
  },

  create: async (site: CreateSiteDto): Promise<void> => {
    return api('/sites', {
      method: 'POST',
      json: site,
    })
  },

  update: async (id: number, site: UpdateSiteDto): Promise<void> => {
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
