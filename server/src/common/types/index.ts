export type CredentialField = {
  label: string
  content: string
  type: 'text' | 'password' | 'email' | 'url'
}

export type CredentialGroup = {
  header: string
  fields: CredentialField[]
}
