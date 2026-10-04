import type { CreateTemplateDto, UpdateTemplateDto } from '@griffin/schemas'

import { api } from '@/app/config/base-api'

import type { TemplatesRepository } from '../repository'
import type { Template, TemplateListItem } from '../types'

const templates = {
  getAll: async (): Promise<TemplateListItem[]> => {
    return api('/templates')
  },

  getById: async (id: number): Promise<Template> => {
    return api(`/templates/${id}`)
  },

  create: async (template: CreateTemplateDto): Promise<void> => {
    return api('/templates', {
      method: 'POST',
      json: template,
    })
  },

  update: async (id: number, template: UpdateTemplateDto): Promise<void> => {
    return api(`/templates/${id}`, {
      method: 'PATCH',
      json: template,
    })
  },

  delete: async (id: number): Promise<void> => {
    return api(`/templates/${id}`, {
      method: 'DELETE',
    })
  },
} satisfies TemplatesRepository

export default templates
