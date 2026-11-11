const formatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatDateTime(value: Date | string | null | undefined): string {
  if (!value) return '—'

  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) return '—'

  return formatter.format(date)
}
