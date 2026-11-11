import type { AllSitesRes } from '@griffin/schemas'

import { matchesSearch } from '@/shared/utils/search'

export function siteMatchesSearch(site: AllSitesRes, term: string): boolean {
  return matchesSearch(term, [
    site.name,
    site.technology,
    site.url,
    ...site.tags.map((tag) => tag.name),
  ])
}
