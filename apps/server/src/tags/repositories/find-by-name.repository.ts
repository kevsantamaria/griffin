import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Tag } from '../entities/tag.entity'

@Injectable()
export class FindTagByNameRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async execute(name: string) {
    return await this.tagRepository.findOneBy({ name })
  }
}
