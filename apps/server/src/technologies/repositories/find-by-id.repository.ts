import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Technology } from '../entities/technology.entity.js'

@Injectable()
export class FindTechnologyByIdRepository {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>
  ) {}

  async execute(id: number) {
    return await this.technologyRepository.findOneBy({ id })
  }
}
