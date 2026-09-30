import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Site } from '../entities/site.entity'

@Injectable()
export class FindSiteByIdRepository {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>
  ) {}

  async execute(id: number): Promise<Site | null> {
    return await this.siteRepository.findOne({
      where: { id },
      relations: { siteTags: { tag: true }, technology: true },
      select: {
        id: true,
        name: true,
        isInternal: true,
        url: true,
        notes: true,
        technology: { name: true },
        credentials: true,
        siteTags: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }
}
