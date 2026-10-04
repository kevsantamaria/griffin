import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Site } from '../entities/site.entity'

@Injectable()
export class SaveSiteRepository {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>
  ) {}

  async execute(site: Site) {
    return this.siteRepository.save(site)
  }
}
