import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { DeleteUserRepository } from './repositories/delete.repository'
import { FindAllUsersRepository } from './repositories/find-all.repository'
import { FindUserByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingUserRepository } from './repositories/find-existing-user.repository'
import { SaveUserRepository } from './repositories/save.repository'
import { UpdateUserRepository } from './repositories/update.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    FindAllUsersRepository,
    FindUserByIdRepository,
    SaveUserRepository,
    FindExistingUserRepository,
    UpdateUserRepository,
    DeleteUserRepository,
  ],
})
export class UsersModule {}
