import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Site } from '../entities/site.entity'

@Injectable()
export class FindSiteByIdRepository {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>
  ) {}

  async execute(id: number) {
    return await this.siteRepository.findOneBy({ id })
  }
}
