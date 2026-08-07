import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../entities/user.entity'

@Injectable()
export class FindExistingUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async execute(filters: { id?: string; username?: string }) {
    return await this.userRepository.existsBy(filters)
  }
}
