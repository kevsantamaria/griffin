import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Tag } from '../entities/tag.entity.js'

@Injectable()
export class SaveTagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async execute(tag: Tag) {
    return this.tagRepository.save(tag)
  }
}
