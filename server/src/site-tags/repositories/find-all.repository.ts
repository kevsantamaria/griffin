import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SiteTag } from '../entities/site-tag.entity'

@Injectable()
export class FindAllSiteTagsRepository {
  constructor(
    @InjectRepository(SiteTag)
    private readonly siteTagRepository: Repository<SiteTag>
  ) {}

  async execute() {
    return await this.siteTagRepository.find()
  }
}
