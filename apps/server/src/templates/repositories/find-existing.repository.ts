import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'

import { Template } from '../entities/template.entity'

@Injectable()
export class FindExistingTemplateRepository {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>
  ) {}

  async execute(filters: { name: string; excludeId?: number }) {
    const where: Record<string, unknown> = { name: filters.name }
    if (filters.excludeId) where.id = Not(filters.excludeId)

    return await this.templateRepository.existsBy(where)
  }
}
