const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

export const normalizeTerm = (term: string): string => fold(term).trim().replace(/\s+/g, ' ')

export function matchesSearch(term: string, values: Array<string | null | undefined>): boolean {
  const needle = normalizeTerm(term)

  if (!needle) return true

  const haystack = fold(values.map((value) => value ?? '').join(' '))

  return needle.split(' ').every((word) => haystack.includes(word))
}
