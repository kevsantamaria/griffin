import type { Template, TemplateListItem } from './types'

export interface TemplatesRepository {
  getAll(): Promise<TemplateListItem[]>
  getById(id: number): Promise<Template>
  create(template: any): Promise<void>
  update(id: number, template: any): Promise<void>
  delete(id: number): Promise<void>
}
