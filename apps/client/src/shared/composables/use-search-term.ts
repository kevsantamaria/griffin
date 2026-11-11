import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useSearchTerm() {
  const route = useRoute()
  const router = useRouter()

  return computed({
    get: () => {
      const value = route.query.q

      if (Array.isArray(value)) return value[0] ?? ''

      return value ?? ''
    },
    set: (value) => {
      const term = value.trim().replace(/\s+/g, ' ')

      void router.replace({ query: { ...route.query, q: term || undefined } })
    },
  })
}
