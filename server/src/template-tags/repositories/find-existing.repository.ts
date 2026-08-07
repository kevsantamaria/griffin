import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TemplateTag } from '../entities/template-tag.entity'

@Injectable()
export class FindExistingTemplateTagRepository {
  constructor(
    @InjectRepository(TemplateTag)
    private readonly templateTagRepository: Repository<TemplateTag>
  ) {}

  async execute(filters: { templateId?: number; tagId?: number }) {
    return await this.templateTagRepository.existsBy(filters)
  }
}
