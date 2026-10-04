import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UpdateTechnologyDto } from '../dto/update-technology.dto'
import { Technology } from '../entities/technology.entity'

@Injectable()
export class PreloadTechnologyRepository {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>
  ) {}

  async execute(id: number, updateTechnologyDto: UpdateTechnologyDto) {
    return await this.technologyRepository.preload({
      id,
      ...updateTechnologyDto,
    })
  }
}
