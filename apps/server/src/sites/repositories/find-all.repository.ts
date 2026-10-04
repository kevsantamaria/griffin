import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PaginationDto } from '../dto/pagination.dto'
import { Site } from '../entities/site.entity'

@Injectable()
export class FindAllSitesRepository {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>
  ) {}

  async execute({ limit, offset }: PaginationDto) {
    return await this.siteRepository.find({
      relations: { siteTags: { tag: true }, technology: true },
      select: {
        id: true,
        name: true,
        isInternal: true,
        url: true,
        technology: { name: true },
        siteTags: true,
        createdAt: true,
      },
      order: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    })
  }
}
