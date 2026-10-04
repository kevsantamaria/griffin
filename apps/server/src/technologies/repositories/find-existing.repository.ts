import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Technology } from '../entities/technology.entity'

@Injectable()
export class FindExistingTechnologyRepository {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>
  ) {}

  async execute(filters: { id?: number; name?: string }) {
    return await this.technologyRepository.existsBy(filters)
  }
}
