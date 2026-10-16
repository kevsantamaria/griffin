import { api } from '@/app/config/base-api'

import type { AuthRepository } from '../repository'

const auth = {
  login: async (user) => {
    return await api('/auth/login', {
      method: 'POST',
      json: user,
    })
  },

  logout: async () => {
    return api('/auth/logout', {
      method: 'POST',
    })
  },

  me: async () => {
    return api('/auth/me')
  },
} satisfies AuthRepository

export default auth
