import { api } from '@/app/config/base-api'

import type { SitesRepository } from '../repository'

const sites = {
  getAll: async (pagination?) => {
    const searchParams = new URLSearchParams()

    if (pagination?.limit !== undefined) searchParams.set('limit', String(pagination.limit))
    if (pagination?.offset !== undefined) searchParams.set('offset', String(pagination.offset))

    const query = searchParams.toString()

    return api(`/sites${query ? `?${query}` : ''}`)
  },

  getById: async (id) => {
    return api(`/sites/${id}`)
  },

  getBySlug: async (slug) => {
    return api(`/sites/slug/${slug}`)
  },

  create: async (site) => {
    return api('/sites', {
      method: 'POST',
      json: site,
    })
  },

  update: async (id, site) => {
    return api(`/sites/${id}`, {
      method: 'PATCH',
      json: site,
    })
  },

  delete: async (id) => {
    return api(`/sites/${id}`, {
      method: 'DELETE',
    })
  },
} satisfies SitesRepository

export default sites
