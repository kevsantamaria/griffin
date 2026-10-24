import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TemplateTag } from '../entities/template-tag.entity.js'

@Injectable()
export class SaveTemplateTagRepository {
  constructor(
    @InjectRepository(TemplateTag)
    private readonly templateTagRepository: Repository<TemplateTag>
  ) {}

  async execute(templateTag: TemplateTag) {
    return this.templateTagRepository.save(templateTag)
  }

  async executeMany(templateTags: TemplateTag[]) {
    return this.templateTagRepository.save(templateTags)
  }
}
