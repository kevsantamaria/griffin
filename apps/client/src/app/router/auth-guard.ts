import type { NavigationGuardReturn, RouteLocationNormalized } from 'vue-router'

import { queryClient } from '@/app/config/lib/query-client'
import { meQueryOptions } from '@/features/auth/queries'

export const authGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
): Promise<NavigationGuardReturn> => {
  let user = null
  try {
    user = await queryClient.query(meQueryOptions)
  } catch {
    // no session or the request failed: treated as an unauthenticated user
  }

  const isLogin = to.name === '/login'

  if (!user && !isLogin) {
    return { name: '/login' }
  }
  if (user && isLogin) {
    return { name: '/' }
  }
}
