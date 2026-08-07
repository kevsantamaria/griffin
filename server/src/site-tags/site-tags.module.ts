import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SiteTag } from './entities/site-tag.entity'
import { SiteTagsController } from './site-tags.controller'
import { SiteTagsService } from './site-tags.service'
import { FindAllSiteTagsRepository } from './repositories/find-all.repository'
import { FindSiteTagByCompositeIdRepository } from './repositories/find-by-composite-id.repository'
import { FindExistingSiteTagRepository } from './repositories/find-existing.repository'
import { SaveSiteTagRepository } from './repositories/save.repository'
import { DeleteSiteTagRepository } from './repositories/delete.repository'

@Module({
  imports: [TypeOrmModule.forFeature([SiteTag])],
  controllers: [SiteTagsController],
  providers: [
    SiteTagsService,
    FindAllSiteTagsRepository,
    FindSiteTagByCompositeIdRepository,
    FindExistingSiteTagRepository,
    SaveSiteTagRepository,
    DeleteSiteTagRepository,
  ],
})
export class SiteTagsModule {}
