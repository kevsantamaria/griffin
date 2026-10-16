import type {
  AllSitesRes,
  CreateSiteDto,
  PaginationDto,
  SingleSiteRes,
  UpdateSiteDto,
} from '@griffin/schemas'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

import sites from '../api'
import type { MutatedSite } from '../types'

export function useSites(pagination?: PaginationDto, options?: { id?: number; slug?: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const queryKey = 'sites'
  const { id, slug } = options ?? {}

  const getAll = useQuery({
    queryKey: [queryKey],
    queryFn: async (): Promise<AllSitesRes[]> => {
      return await sites.getAll(pagination)
    },
  })

  const getById = useQuery({
    queryKey: [queryKey, id],
    queryFn: async (): Promise<SingleSiteRes | null> => {
      return await sites.getById(id!)
    },
    enabled: !!id,
  })

  const getBySlug = useQuery({
    queryKey: [queryKey, 'slug', slug],
    queryFn: async (): Promise<SingleSiteRes | null> => {
      return await sites.getBySlug(slug!)
    },
    enabled: !!slug,
  })

  const create = useMutation({
    mutationFn: async (site: CreateSiteDto): Promise<MutatedSite> => {
      return await sites.create(site)
    },
    onSuccess: (newSite) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      router.push(`/sites/${newSite.slug}`)
    },
  })

  const update = useMutation({
    mutationFn: async ({ id, site }: { id: number; site: UpdateSiteDto }): Promise<MutatedSite> => {
      return await sites.update(id, site)
    },
    onSuccess: (updatedSite) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      router.push(`/sites/${updatedSite.slug}`)
    },
  })

  const remove = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      return await sites.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      router.push('/sites')
    },
  })

  return { getAll, getById, getBySlug, create, update, remove }
}
