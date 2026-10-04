import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from 'src/users/entities/user.entity'

import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.authService.validate(username, password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return user
  }
}
