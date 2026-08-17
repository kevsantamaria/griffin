import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SiteTag } from '../sites/entities/site-tag.entity'
import { FindAllSiteTagsRepository } from './repositories/find-all.repository'
import { FindSiteTagByCompositeIdRepository } from './repositories/find-by-composite-id.repository'
import { FindExistingSiteTagRepository } from './repositories/find-existing.repository'
import { SiteTagsController } from './site-tags.controller'
import { SiteTagsService } from './site-tags.service'

@Module({
  imports: [TypeOrmModule.forFeature([SiteTag])],
  controllers: [SiteTagsController],
  providers: [
    SiteTagsService,
    FindAllSiteTagsRepository,
    FindSiteTagByCompositeIdRepository,
    FindExistingSiteTagRepository,
  ],
})
export class SiteTagsModule {}
