import type { Tag } from '@/shared/types'

export type Template = {
  id: number
  name: string
  groups: TemplateGroup[]
  technology: string
  tags: Tag[]
  createdAt: Date
  updatedAt: Date
}

export type TemplateListItem = Pick<Template, 'id' | 'name' | 'technology' | 'tags'>

export type TemplateField = {
  label: string
  type: 'text' | 'password' | 'email' | 'url'
}

export type TemplateGroup = {
  header: string
  fields: TemplateField[]
}
