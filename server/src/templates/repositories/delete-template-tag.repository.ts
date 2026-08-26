import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TemplateTag } from '../entities/template-tag.entity'

@Injectable()
export class DeleteTemplateTagRepository {
  constructor(
    @InjectRepository(TemplateTag)
    private readonly templateTagRepository: Repository<TemplateTag>
  ) {}

  async execute(templateId: number, tagId: number) {
    return await this.templateTagRepository.delete({ templateId, tagId })
  }

  async executeByTemplateId(templateId: number) {
    return await this.templateTagRepository.delete({ templateId })
  }
}
