import type {
  AllTemplatesRes,
  CreateTemplateDto,
  SingleTemplateRes,
  UpdateTemplateDto,
} from '@griffin/schemas'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

import type { ApiError } from '@/app/config/base-api'

import templates from '../api'
import type { MutatedTemplate } from '../types'

export function useTemplates(options?: { id?: number; slug?: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const queryKey = 'templates'
  const { id, slug } = options ?? {}

  const getAll = useQuery({
    queryKey: [queryKey],
    queryFn: async (): Promise<AllTemplatesRes[]> => {
      return await templates.getAll()
    },
  })

  const getById = useQuery({
    queryKey: [queryKey, id],
    queryFn: async (): Promise<SingleTemplateRes | null> => {
      return await templates.getById(id!)
    },
    enabled: !!id,
  })

  const getBySlug = useQuery({
    queryKey: [queryKey, 'slug', slug],
    queryFn: async (): Promise<SingleTemplateRes | null> => {
      return await templates.getBySlug(slug!)
    },
    enabled: !!slug,
  })

  const create = useMutation<MutatedTemplate, ApiError, CreateTemplateDto>({
    mutationFn: async (template: CreateTemplateDto): Promise<MutatedTemplate> => {
      return await templates.create(template)
    },
    onSuccess: (newTemplate) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      router.push(`/templates/${newTemplate.slug}`)
    },
  })

  const update = useMutation({
    mutationFn: async ({
      id,
      template,
    }: {
      id: number
      template: UpdateTemplateDto
    }): Promise<MutatedTemplate> => {
      return await templates.update(id, template)
    },
    onSuccess: (updateTemplate) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      router.push(`/templates/${updateTemplate.slug}`)
    },
  })

  const remove = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      return await templates.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      router.push('/templates')
    },
  })

  return { getAll, getById, getBySlug, create, update, remove }
}
