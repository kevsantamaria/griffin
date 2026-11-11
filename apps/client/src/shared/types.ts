export type DisplayableField = {
  state: { meta: { isValid: boolean; isBlurred: boolean } }
}

export type DetailItem = {
  label: string
  value?: string | number | null
  mono?: boolean
}
