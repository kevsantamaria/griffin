import { useQuery } from '@tanstack/vue-query'

import profile from '../api'
import type { Profile } from '../types'

export function useProfile(id: string) {
  const queryKey = 'profile'

  const getById = useQuery({
    queryKey: [queryKey, id],
    queryFn: async (): Promise<Profile> => {
      return await profile.get(id)
    },
    enabled: !!id,
  })

  return { getById }
}
