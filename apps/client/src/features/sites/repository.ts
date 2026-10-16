import type {
  AllSitesRes,
  CreateSiteDto,
  PaginationDto,
  SingleSiteRes,
  UpdateSiteDto,
} from '@griffin/schemas'

import type { MutatedSite } from './types'

export interface SitesRepository {
  getAll(params?: PaginationDto): Promise<AllSitesRes[] | []>
  getById(id: number): Promise<SingleSiteRes | null>
  getBySlug(slug: string): Promise<SingleSiteRes | null>
  create(site: CreateSiteDto): Promise<MutatedSite>
  update(id: number, site: UpdateSiteDto): Promise<MutatedSite>
  delete(id: number): Promise<void>
}
