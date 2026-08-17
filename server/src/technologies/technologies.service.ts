import { ConflictException, Injectable } from '@nestjs/common'
import { NotFoundError } from 'rxjs'

import { CreateTechnologyDto } from './dto/create-technology.dto'
import { UpdateTechnologyDto } from './dto/update-technology.dto'
import { Technology } from './entities/technology.entity'
import { FindTechnologyByNameRepository } from './repositories/find-by-name.repository'
import { FindExistingTechnologyRepository } from './repositories/find-existing.repository'
import { SaveTechnologyRepository } from './repositories/save.repository'

@Injectable()
export class TechnologiesService {
  constructor(
    private readonly findTechnologyByName: FindTechnologyByNameRepository,
    private readonly findExistingTechnology: FindExistingTechnologyRepository,
    private readonly saveTechnology: SaveTechnologyRepository
  ) {}

  async create(createTechnologyDto: CreateTechnologyDto) {
    const existingTechnology = await this.findExistingTechnology.execute({
      name: createTechnologyDto.name,
    })
    if (existingTechnology)
      throw new ConflictException(`Technology with name ${createTechnologyDto.name} already exists`)

    const technology = new Technology()
    technology.name = createTechnologyDto.name

    return await this.saveTechnology.execute(technology)
  }

  async findAll() {
    return `This action returns all technologies`
  }

  async findOne(id: number) {
    const technology = await this.findExistingTechnology.execute({ id })
    if (!technology) throw new NotFoundError('Technology not found')
    return technology
  }

  async update(id: number, updateTechnologyDto: UpdateTechnologyDto) {
    return `This action updates a #${id} technology`
  }

  async remove(id: number) {
    return `This action removes a #${id} technology`
  }

  async findOrCreate(name: string) {
    const existingTechnology = await this.findTechnologyByName.execute(name)
    if (!existingTechnology) {
      const technology = new Technology()
      technology.name = name

      return await this.saveTechnology.execute(technology)
    }

    return existingTechnology
  }
}
