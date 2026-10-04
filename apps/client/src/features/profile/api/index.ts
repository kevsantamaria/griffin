import { api } from '@/app/config/base-api'

import type { ProfileRepository } from '../repository'
import type { Profile } from '../types'

const profile: ProfileRepository = {
  get: async (id: string): Promise<Profile> => {
    return await api(`/profile/${id}`)
  },
}

export default profile
