import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Technology } from '../entities/technology.entity'

@Injectable()
export class FindAllTechnologiesRepository {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>
  ) {}

  async execute() {
    return await this.technologyRepository.find()
  }
}
