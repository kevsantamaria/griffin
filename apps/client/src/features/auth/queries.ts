import { queryOptions } from '@tanstack/vue-query'

import auth from './api'

export const meQueryOptions = queryOptions({
  queryKey: ['me'],
  queryFn: () => auth.me(),
  staleTime: 60 * 1000,
  retry: false,
})
