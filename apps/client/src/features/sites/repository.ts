import type {
  Site,
  SiteListItem,
  GetAllSitesParams,
  CreateSiteParams,
  UpdateSiteParams,
} from './types'

export interface SitesRepository {
  getAll(params?: GetAllSitesParams): Promise<SiteListItem[] | []>
  getById(id: number): Promise<Site | null>
  create(site: CreateSiteParams): Promise<void>
  update(id: number, site: UpdateSiteParams): Promise<void>
  delete(id: number): Promise<void>
}
