import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Technology } from './entities/technology.entity'
import { DeleteTechnologyRepository } from './repositories/delete.repository'
import { FindAllTechnologiesRepository } from './repositories/find-all.repository'
import { FindTechnologyByIdRepository } from './repositories/find-by-id.repository'
import { FindTechnologyByNameRepository } from './repositories/find-by-name.repository'
import { FindExistingTechnologyRepository } from './repositories/find-existing.repository'
import { PreloadTechnologyRepository } from './repositories/preload.repository'
import { SaveTechnologyRepository } from './repositories/save.repository'
import { TechnologiesController } from './technologies.controller'
import { TechnologiesService } from './technologies.service'

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologiesController],
  providers: [
    TechnologiesService,
    FindAllTechnologiesRepository,
    FindTechnologyByIdRepository,
    FindTechnologyByNameRepository,
    FindExistingTechnologyRepository,
    SaveTechnologyRepository,
    PreloadTechnologyRepository,
    DeleteTechnologyRepository,
  ],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}
