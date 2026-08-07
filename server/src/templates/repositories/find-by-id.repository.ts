import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Template } from '../entities/template.entity'

@Injectable()
export class FindTemplateByIdRepository {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>
  ) {}

  async execute(id: number) {
    return await this.templateRepository.findOneBy({ id })
  }
}
