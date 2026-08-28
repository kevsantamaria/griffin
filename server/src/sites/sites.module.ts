import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EncryptionModule } from 'src/encryption/encryption.module'
import { TagsModule } from 'src/tags/tags.module'
import { TechnologiesModule } from 'src/technologies/technologies.module'

import { SiteTag } from './entities/site-tag.entity'
import { Site } from './entities/site.entity'
import { DeleteSiteTagRepository } from './repositories/delete-site-tag.repository'
import { DeleteSiteRepository } from './repositories/delete.repository'
import { FindAllSitesRepository } from './repositories/find-all.repository'
import { FindSiteByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingSiteRepository } from './repositories/find-existing.repository'
import { PreloadSiteRepository } from './repositories/preload.repository'
import { SaveSiteTagRepository } from './repositories/save-site-tag.repository'
import { SaveSiteRepository } from './repositories/save.repository'
import { SitesController } from './sites.controller'
import { SitesService } from './sites.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Site, SiteTag]),
    TechnologiesModule,
    TagsModule,
    EncryptionModule,
  ],
  controllers: [SitesController],
  providers: [
    SitesService,
    FindAllSitesRepository,
    FindSiteByIdRepository,
    FindExistingSiteRepository,
    SaveSiteRepository,
    PreloadSiteRepository,
    DeleteSiteRepository,
    SaveSiteTagRepository,
    DeleteSiteTagRepository,
  ],
})
export class SitesModule {}
