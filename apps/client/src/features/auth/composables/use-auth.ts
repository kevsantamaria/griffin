import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

import auth from '../api'
import { meQueryOptions } from '../queries'
import type { LoginParams, UserLogged } from '../types'

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const login = useMutation({
    mutationFn: async (user: LoginParams): Promise<UserLogged> => {
      return await auth.login(user)
    },
    onSuccess: (user: UserLogged) => {
      queryClient.setQueryData(meQueryOptions.queryKey, user)
      router.push('/sites')
    },
  })

  const logout = useMutation({
    mutationFn: async (): Promise<void> => {
      return await auth.logout()
    },
    onSuccess: () => {
      queryClient.clear()
      router.push('/login')
    },
  })

  const me = useQuery(meQueryOptions)

  return { login, logout, me }
}
