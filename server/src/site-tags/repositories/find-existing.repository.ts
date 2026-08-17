import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SiteTag } from '../../sites/entities/site-tag.entity'

@Injectable()
export class FindExistingSiteTagRepository {
  constructor(
    @InjectRepository(SiteTag)
    private readonly siteTagRepository: Repository<SiteTag>
  ) {}

  async execute(filters: { siteId?: number; tagId?: number }) {
    return await this.siteTagRepository.existsBy(filters)
  }
}
