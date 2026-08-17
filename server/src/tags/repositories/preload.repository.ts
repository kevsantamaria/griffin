import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UpdateTagDto } from '../dto/update-tag.dto'
import { Tag } from '../entities/tag.entity'

@Injectable()
export class PreloadTagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async execute(id: number, updateTagDto: UpdateTagDto) {
    return await this.tagRepository.preload({
      id,
      ...updateTagDto,
    })
  }
}
