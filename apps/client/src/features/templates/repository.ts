import type { CreateTemplateDto, UpdateTemplateDto } from '@griffin/schemas'

import type { Template, TemplateListItem } from './types'

export interface TemplatesRepository {
  getAll(): Promise<TemplateListItem[]>
  getById(id: number): Promise<Template>
  create(template: CreateTemplateDto): Promise<void>
  update(id: number, template: UpdateTemplateDto): Promise<void>
  delete(id: number): Promise<void>
}
