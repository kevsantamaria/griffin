import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Site } from '../entities/site.entity'

@Injectable()
export class FindExistingSiteRepository {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>
  ) {}

  async execute(filters: { id?: number; name?: string }) {
    return await this.siteRepository.existsBy(filters)
  }
}
