import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EncryptionModule } from '../encryption/encryption.module.js'
import { TagsModule } from '../tags/tags.module.js'
import { TechnologiesModule } from '../technologies/technologies.module.js'

import { SiteTag } from './entities/site-tag.entity.js'
import { Site } from './entities/site.entity.js'
import { DeleteSiteTagRepository } from './repositories/delete-site-tag.repository.js'
import { DeleteSiteRepository } from './repositories/delete.repository.js'
import { FindAllSitesRepository } from './repositories/find-all.repository.js'
import { FindSiteByIdRepository } from './repositories/find-by-id.repository.js'
import { FindSiteBySlugRepository } from './repositories/find-by-slug.repository.js'
import { FindExistingSiteRepository } from './repositories/find-existing.repository.js'
import { PreloadSiteRepository } from './repositories/preload.repository.js'
import { SaveSiteTagRepository } from './repositories/save-site-tag.repository.js'
import { SaveSiteRepository } from './repositories/save.repository.js'
import { SitesController } from './sites.controller.js'
import { SitesService } from './sites.service.js'

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
    FindSiteBySlugRepository,
    FindExistingSiteRepository,
    SaveSiteRepository,
    PreloadSiteRepository,
    DeleteSiteRepository,
    SaveSiteTagRepository,
    DeleteSiteTagRepository,
  ],
})
export class SitesModule {}
