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

  async execute(id: number): Promise<Template | null> {
    return await this.templateRepository.findOne({
      where: { id },
      relations: { templateTags: { tag: true }, technology: true },
      select: {
        id: true,
        name: true,
        technology: { name: true },
        groups: true,
        templateTags: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }
}
