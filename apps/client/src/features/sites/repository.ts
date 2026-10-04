import type { PaginationDto, CreateSiteDto, UpdateSiteDto } from '@griffin/schemas'

import type { Site, SiteListItem } from './types'

export interface SitesRepository {
  getAll(params?: PaginationDto): Promise<SiteListItem[] | []>
  getById(id: number): Promise<Site | null>
  create(site: CreateSiteDto): Promise<void>
  update(id: number, site: UpdateSiteDto): Promise<void>
  delete(id: number): Promise<void>
}
