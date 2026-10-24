import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Technology } from './entities/technology.entity.js'
import { DeleteTechnologyRepository } from './repositories/delete.repository.js'
import { FindAllTechnologiesRepository } from './repositories/find-all.repository.js'
import { FindTechnologyByIdRepository } from './repositories/find-by-id.repository.js'
import { FindTechnologyByNameRepository } from './repositories/find-by-name.repository.js'
import { FindExistingTechnologyRepository } from './repositories/find-existing.repository.js'
import { PreloadTechnologyRepository } from './repositories/preload.repository.js'
import { SaveTechnologyRepository } from './repositories/save.repository.js'
import { TechnologiesController } from './technologies.controller.js'
import { TechnologiesService } from './technologies.service.js'

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
