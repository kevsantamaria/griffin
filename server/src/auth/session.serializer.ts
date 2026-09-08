import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super()
  }

  serializeUser(user: User, done: (error: Error | null, id?: string) => void) {
    done(null, user.id)
  }

  async deserializeUser(
    id: string,
    done: (error: Error | null, user?: User | false | null) => void
  ) {
    try {
      const user = await this.usersService.findOne(id)
      done(null, user ?? false)
    } catch {
      done(null, false)
    }
  }
}
