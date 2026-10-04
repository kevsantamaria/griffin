import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { hash } from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { DeleteUserRepository } from './repositories/delete.repository'
import { FindAllUsersRepository } from './repositories/find-all.repository'
import { FindUserByIdRepository } from './repositories/find-by-id.repository'
import { FindUserByUsernameRepository } from './repositories/find-by-username.repository'
import { FindExistingUserRepository } from './repositories/find-existing-user.repository'
import { PreloadUserRepository } from './repositories/preload.repository'
import { SaveUserRepository } from './repositories/save.repository'

type UserRes = Omit<User, 'password'>

@Injectable()
export class UsersService {
  constructor(
    private readonly findUserById: FindUserByIdRepository,
    private readonly findUserByUsername: FindUserByUsernameRepository,
    private readonly findExistingUser: FindExistingUserRepository,
    private readonly findAllUsers: FindAllUsersRepository,
    private readonly saveUser: SaveUserRepository,
    private readonly preloadUser: PreloadUserRepository,
    private readonly deleteUser: DeleteUserRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserRes> {
    const existingUser = await this.findExistingUser.execute({ username: createUserDto.username })
    if (existingUser) throw new ConflictException('The user already exists')

    const user = new User()
    user.username = createUserDto.username
    user.password = await hash(createUserDto.password, 10)

    const { password: _password, ...res } = await this.saveUser.execute(user)

    return res
  }

  async findAll(): Promise<User[]> {
    return await this.findAllUsers.execute()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.findUserById.execute(id)
    if (!user) throw new NotFoundException(`User with id '${id}' not found`)

    return user
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.findUserByUsername.execute(username)
    if (!user) throw new UnauthorizedException(`User with id '${username}' not found`)

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserRes> {
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10)
    }

    const existingUser = await this.preloadUser.execute(id, updateUserDto)
    if (!existingUser) throw new NotFoundException(`User with id '${id}' not found`)

    if (updateUserDto.username) {
      const conflict = await this.findExistingUser.execute({ username: updateUserDto.username })
      if (conflict) throw new ConflictException('The user already exists')
    }

    const { password: _password, ...res } = await this.saveUser.execute(existingUser)

    return res
  }

  async remove(id: string) {
    const result = await this.deleteUser.execute(id)
    if (result.affected === 0) throw new NotFoundException(`User with id '${id}' not found`)

    return result
  }
}
