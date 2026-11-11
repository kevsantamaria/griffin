import { env } from './env'

type ApiOptions = RequestInit & {
  json?: unknown
}

type ApiResponse<T> = {
  message: string
  data: T
}

export type ValidationIssue = {
  path: (string | number)[]
  message: string
  code: string
  origin?: string
}

export class ApiError extends Error {
  statusCode: number
  errors: ValidationIssue[]

  constructor(message: string, statusCode: number, errors: ValidationIssue[]) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

export async function api<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const { json, headers, ...rest } = options

  const res = await fetch(env.API_URL + path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: json ? JSON.stringify(json) : rest.body,
    ...rest,
  })

  if (!res.ok) {
    let message = `HTTP ${res.status}`
    let errors: ValidationIssue[] = []
    try {
      const data = await res.json()
      message = data?.message || message
      if (Array.isArray(data?.errors)) errors = data.errors
    } catch {
      // body is not JSON, keep the fallback message
    }

    throw new ApiError(message, res.status, errors)
  }

  if (res.status === 204) return undefined as T

  const data: ApiResponse<T> = await res.json()
  return data.data
}
