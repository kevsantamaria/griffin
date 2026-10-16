import type {
  AllTemplatesRes,
  CreateTemplateDto,
  SingleTemplateRes,
  UpdateTemplateDto,
} from '@griffin/schemas'

import type { MutatedTemplate } from './types'

export interface TemplatesRepository {
  getAll(): Promise<AllTemplatesRes[]>
  getById(id: number): Promise<SingleTemplateRes>
  getBySlug(slug: string): Promise<SingleTemplateRes>
  create(template: CreateTemplateDto): Promise<MutatedTemplate>
  update(id: number, template: UpdateTemplateDto): Promise<MutatedTemplate>
  delete(id: number): Promise<void>
}
