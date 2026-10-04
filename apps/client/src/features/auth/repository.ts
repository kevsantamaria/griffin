import type { LoginParams, UserLogged } from './types'

export interface AuthRepository {
  login(user: LoginParams): Promise<UserLogged>
  logout(): Promise<void>
  me(): Promise<UserLogged>
}
