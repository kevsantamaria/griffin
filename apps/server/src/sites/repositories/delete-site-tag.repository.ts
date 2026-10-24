import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SiteTag } from '../entities/site-tag.entity.js'

@Injectable()
export class DeleteSiteTagRepository {
  constructor(
    @InjectRepository(SiteTag)
    private readonly siteTagRepository: Repository<SiteTag>
  ) {}

  async execute(siteId: number, tagId: number) {
    return await this.siteTagRepository.delete({ siteId, tagId })
  }

  async executeBySiteId(siteId: number) {
    return await this.siteTagRepository.delete({ siteId })
  }
}
