import type { Tag } from '@/shared/types'

export type Site = {
  id: number
  name: string
  url: string
  isInternal: boolean
  notes: string
  technology: string
  credentials: CredentialGroup[]
  tags: Tag[]
  createdAt: Date
  updatedAt: Date
}

export type SiteListItem = Pick<Site, 'id' | 'name' | 'isInternal' | 'technology' | 'tags' | 'url'>

type CredentialField = {
  label: string
  content: string
  type: 'text' | 'password' | 'email' | 'url'
}

type CredentialGroup = {
  header: string
  fields: CredentialField[]
}

// TODO pasar estos tipos a validaciones reales

export type GetAllSitesParams = {
  pagination: { limit: number; offset: number }
}

export type CreateSiteParams = {
  name: string
  url: string
  isInternal: boolean
  notes: string
  technologyName: string
  credentials: CredentialGroup[]
  tagNames: string[]
}

export type UpdateSiteParams = Partial<CreateSiteParams>
