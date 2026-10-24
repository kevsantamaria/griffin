import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity.js'
import { DeleteUserRepository } from './repositories/delete.repository.js'
import { FindAllUsersRepository } from './repositories/find-all.repository.js'
import { FindUserByIdRepository } from './repositories/find-by-id.repository.js'
import { FindUserByUsernameRepository } from './repositories/find-by-username.repository.js'
import { FindExistingUserRepository } from './repositories/find-existing-user.repository.js'
import { PreloadUserRepository } from './repositories/preload.repository.js'
import { SaveUserRepository } from './repositories/save.repository.js'
import { UsersController } from './users.controller.js'
import { UsersService } from './users.service.js'

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
