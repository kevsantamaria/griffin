import { useQuery } from '@tanstack/vue-query'

import profile from '../api'
import type { Profile } from '../types'

export function useProfile(id?: string) {
  const get = useQuery({
    queryKey: ['profile', id],
    queryFn: async (): Promise<Profile> => {
      return profile.get({ id: id! })
    },
    enabled: !!id,
  })

  return { get }
}
