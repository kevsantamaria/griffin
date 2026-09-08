import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { DeleteUserRepository } from './repositories/delete.repository'
import { FindAllUsersRepository } from './repositories/find-all.repository'
import { FindUserByIdRepository } from './repositories/find-by-id.repository'
import { FindUserByUsernameRepository } from './repositories/find-by-username.repository'
import { FindExistingUserRepository } from './repositories/find-existing-user.repository'
import { PreloadUserRepository } from './repositories/preload.repository'
import { SaveUserRepository } from './repositories/save.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    FindAllUsersRepository,
    FindUserByIdRepository,
    FindUserByUsernameRepository,
    SaveUserRepository,
    FindExistingUserRepository,
    PreloadUserRepository,
    DeleteUserRepository,
  ],
  exports: [UsersService],
})
export class UsersModule {}
