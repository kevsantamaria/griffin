import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TemplateTag } from './entities/template-tag.entity'
import { TemplateTagsController } from './template-tags.controller'
import { TemplateTagsService } from './template-tags.service'
import { FindAllTemplateTagsRepository } from './repositories/find-all.repository'
import { FindTemplateTagByCompositeIdRepository } from './repositories/find-by-composite-id.repository'
import { FindExistingTemplateTagRepository } from './repositories/find-existing.repository'
import { SaveTemplateTagRepository } from './repositories/save.repository'
import { DeleteTemplateTagRepository } from './repositories/delete.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TemplateTag])],
  controllers: [TemplateTagsController],
  providers: [
    TemplateTagsService,
    FindAllTemplateTagsRepository,
    FindTemplateTagByCompositeIdRepository,
    FindExistingTemplateTagRepository,
    SaveTemplateTagRepository,
    DeleteTemplateTagRepository,
  ],
})
export class TemplateTagsModule {}
