import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Tag } from '../entities/tag.entity.js'

@Injectable()
export class FindExistingTagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async execute(filters: { id?: number; name?: string }) {
    return await this.tagRepository.existsBy(filters)
  }
}
