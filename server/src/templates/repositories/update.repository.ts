import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UpdateTemplateDto } from '../dto/update-template.dto'
import { Template } from '../entities/template.entity'

@Injectable()
export class UpdateTemplateRepository {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>
  ) {}

  async execute(id: number, updateTemplateDto: UpdateTemplateDto) {
    return await this.templateRepository.preload({
      id,
      ...updateTemplateDto,
    })
  }
}
