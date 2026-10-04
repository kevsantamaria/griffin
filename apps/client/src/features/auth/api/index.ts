import { api } from '@/app/config/base-api'

import type { AuthRepository } from '../repository'
import type { LoginParams, UserLogged } from '../types'

const auth: AuthRepository = {
  login: async (user: LoginParams): Promise<UserLogged> => {
    return await api('/auth/login', {
      method: 'POST',
      json: user,
    })
  },

  logout: async (): Promise<void> => {
    return api('/logout', {
      method: 'POST',
    })
  },

  me: async (): Promise<UserLogged> => {
    return api('/me')
  },
}

export default auth
