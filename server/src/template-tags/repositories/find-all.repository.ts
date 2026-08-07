import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TemplateTag } from '../entities/template-tag.entity'

@Injectable()
export class FindAllTemplateTagsRepository {
  constructor(
    @InjectRepository(TemplateTag)
    private readonly templateTagRepository: Repository<TemplateTag>
  ) {}

  async execute() {
    return await this.templateTagRepository.find()
  }
}
