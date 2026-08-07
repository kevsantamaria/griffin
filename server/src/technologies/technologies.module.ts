import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Technology } from './entities/technology.entity'
import { TechnologiesController } from './technologies.controller'
import { TechnologiesService } from './technologies.service'
import { FindAllTechnologiesRepository } from './repositories/find-all.repository'
import { FindTechnologyByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingTechnologyRepository } from './repositories/find-existing.repository'
import { SaveTechnologyRepository } from './repositories/save.repository'
import { UpdateTechnologyRepository } from './repositories/update.repository'
import { DeleteTechnologyRepository } from './repositories/delete.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologiesController],
  providers: [
    TechnologiesService,
    FindAllTechnologiesRepository,
    FindTechnologyByIdRepository,
    FindExistingTechnologyRepository,
    SaveTechnologyRepository,
    UpdateTechnologyRepository,
    DeleteTechnologyRepository,
  ],
})
export class TechnologiesModule {}
