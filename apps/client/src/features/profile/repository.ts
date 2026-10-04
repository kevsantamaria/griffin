import type { Profile } from './types'

export interface ProfileRepository {
  get(id: string): Promise<Profile>
}
