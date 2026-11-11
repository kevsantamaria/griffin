import type { AllTemplatesRes } from '@griffin/schemas'

import { matchesSearch } from '@/shared/utils/search'

import type { TemplateFormState } from './types'

export function templateMatchesSearch(template: AllTemplatesRes, term: string): boolean {
  return matchesSearch(term, [
    template.name,
    template.technology,
    ...template.tags.map((tag) => tag.name),
  ])
}

export function addGroup(form: TemplateFormState) {
  form.groups.push({ header: '', fields: [{ label: '', type: 'text' }] })
}

export function removeGroup(form: TemplateFormState, index: number) {
  form.groups.splice(index, 1)
}

export function addField(form: TemplateFormState, groupIndex: number) {
  form.groups[groupIndex]?.fields.push({ label: '', type: 'text' })
}

export function removeField(form: TemplateFormState, groupIndex: number, fieldIndex: number) {
  form.groups[groupIndex]?.fields.splice(fieldIndex, 1)
}
