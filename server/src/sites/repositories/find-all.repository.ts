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
      select: { technology: { name: true } },
      order: { id: 'desc' },
      skip: offset,
      take: limit,
    })
  }
}
