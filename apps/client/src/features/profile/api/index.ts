import { api } from '@/app/config/base-api'

import type { ProfileRepository } from '../repository'

const profile = {
  get: async (id) => {
    return await api(`/profile/${id}`)
  },
} satisfies ProfileRepository

export default profile
