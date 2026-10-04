import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

import auth from '../api'
import type { LoginPayload, UserLogged } from '../types'

export function useAuth() {
  const router = useRouter()

  const login = useMutation({
    mutationFn: async (user: LoginPayload): Promise<UserLogged> => {
      return auth.login(user)
    },
    onSuccess: () => {
      router.push('/sites')
    },
  })

  const logout = useMutation({
    mutationFn: async (): Promise<void> => {
      return auth.logout()
    },
    onSuccess: () => {
      router.push('/login')
    },
  })

  return { login, logout }
}
