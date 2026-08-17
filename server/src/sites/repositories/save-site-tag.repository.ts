import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SiteTag } from '../entities/site-tag.entity'

@Injectable()
export class SaveSiteTagRepository {
  constructor(
    @InjectRepository(SiteTag)
    private readonly siteTagRepository: Repository<SiteTag>
  ) {}

  async execute(siteTag: SiteTag) {
    return this.siteTagRepository.save(siteTag)
  }

  async executeMany(siteTags: SiteTag[]) {
    return this.siteTagRepository.save(siteTags)
  }
}
