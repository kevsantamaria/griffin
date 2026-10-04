import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UpdateSiteDto } from '../dto/update-site.dto'
import { Site } from '../entities/site.entity'

@Injectable()
export class PreloadSiteRepository {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>
  ) {}

  async execute(id: number, updateSiteDto: UpdateSiteDto) {
    const { name, url, isInternal, notes } = updateSiteDto

    return await this.siteRepository.preload({
      id,
      name,
      url,
      isInternal,
      notes,
    })
  }
}
