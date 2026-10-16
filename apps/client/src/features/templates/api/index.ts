import { api } from '@/app/config/base-api'

import type { TemplatesRepository } from '../repository'

const templates = {
  getAll: async () => {
    return api('/templates')
  },

  getById: async (id) => {
    return api(`/templates/${id}`)
  },

  getBySlug: async (slug) => {
    return api(`/templates/slug/${slug}`)
  },

  create: async (template) => {
    return api('/templates', {
      method: 'POST',
      json: template,
    })
  },

  update: async (id, template) => {
    return api(`/templates/${id}`, {
      method: 'PATCH',
      json: template,
    })
  },

  delete: async (id) => {
    return api(`/templates/${id}`, {
      method: 'DELETE',
    })
  },
} satisfies TemplatesRepository

export default templates
