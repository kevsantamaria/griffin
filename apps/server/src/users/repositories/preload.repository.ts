import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UpdateUserDto } from '../dto/update-user.dto.js'
import { User } from '../entities/user.entity.js'

@Injectable()
export class PreloadUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.preload({
      id,
      ...updateUserDto,
    })
  }
}
