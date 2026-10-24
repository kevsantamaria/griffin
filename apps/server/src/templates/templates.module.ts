import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagsModule } from '../tags/tags.module.js'
import { TechnologiesModule } from '../technologies/technologies.module.js'

import { TemplateTag } from './entities/template-tag.entity.js'
import { Template } from './entities/template.entity.js'
import { DeleteTemplateTagRepository } from './repositories/delete-template-tag.repository.js'
import { DeleteTemplateRepository } from './repositories/delete.repository.js'
import { FindAllTemplatesRepository } from './repositories/find-all.repository.js'
import { FindTemplateByIdRepository } from './repositories/find-by-id.repository.js'
import { FindTemplateBySlugRepository } from './repositories/find-by-slug.repository.js'
import { FindExistingTemplateRepository } from './repositories/find-existing.repository.js'
import { PreloadTemplateRepository } from './repositories/preload.repository.js'
import { SaveTemplateTagRepository } from './repositories/save-template-tag.repository.js'
import { SaveTemplateRepository } from './repositories/save.repository.js'
import { TemplatesController } from './templates.controller.js'
import { TemplatesService } from './templates.service.js'

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateTag]), TechnologiesModule, TagsModule],
  controllers: [TemplatesController],
  providers: [
    TemplatesService,
    FindAllTemplatesRepository,
    FindTemplateByIdRepository,
    FindTemplateBySlugRepository,
    FindExistingTemplateRepository,
    SaveTemplateRepository,
    PreloadTemplateRepository,
    DeleteTemplateRepository,
    SaveTemplateTagRepository,
    DeleteTemplateTagRepository,
  ],
})
export class TemplatesModule {}
