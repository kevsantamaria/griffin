import { Injectable } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByUsername(username).catch(() => null)

    if (user && (await compare(password, user?.password))) {
      const { password: _password, ...result } = user
      return result
    }
    return null
  }
}
