import type { CredentialGroup, TemplateGroup } from './schemas/credential.schema'

export type SingleSiteRes = {
  id: number
  name: string
  url: string | null
  isInternal: boolean
  notes: string | null
  technology: string
  credentials: CredentialGroup[]
  tags: Tag[]
  slug: string
  createdAt: Date
  updatedAt: Date
}

export type AllSitesRes = Pick<
  SingleSiteRes,
  'id' | 'name' | 'isInternal' | 'technology' | 'tags' | 'url' | 'slug'
>

export type SingleTemplateRes = {
  id: number
  name: string
  groups: TemplateGroup[]
  createdAt: Date
  updatedAt: Date
  technology: string
  tags: Tag[]
  slug: string
}

export type AllTemplatesRes = Pick<
  SingleTemplateRes,
  'id' | 'name' | 'technology' | 'tags' | 'slug'
>

type Tag = {
  id: number
  name: string
}
