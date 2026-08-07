import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Site } from './entities/site.entity'
import { SitesController } from './sites.controller'
import { SitesService } from './sites.service'
import { FindAllSitesRepository } from './repositories/find-all.repository'
import { FindSiteByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingSiteRepository } from './repositories/find-existing.repository'
import { SaveSiteRepository } from './repositories/save.repository'
import { UpdateSiteRepository } from './repositories/update.repository'
import { DeleteSiteRepository } from './repositories/delete.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  controllers: [SitesController],
  providers: [
    SitesService,
    FindAllSitesRepository,
    FindSiteByIdRepository,
    FindExistingSiteRepository,
    SaveSiteRepository,
    UpdateSiteRepository,
    DeleteSiteRepository,
  ],
})
export class SitesModule {}
