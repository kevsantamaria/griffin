import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Technology } from '../entities/technology.entity'

@Injectable()
export class SaveTechnologyRepository {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>
  ) {}

  async execute(technology: Technology) {
    return this.technologyRepository.save(technology)
  }
}
