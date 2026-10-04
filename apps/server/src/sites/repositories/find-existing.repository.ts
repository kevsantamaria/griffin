import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'

import { Site } from '../entities/site.entity'

@Injectable()
export class FindExistingSiteRepository {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>
  ) {}

  async execute(filters: { name: string; excludeId?: number }) {
    const where: Record<string, unknown> = { name: filters.name }
    if (filters.excludeId) where.id = Not(filters.excludeId)

    return await this.siteRepository.existsBy(where)
  }
}
