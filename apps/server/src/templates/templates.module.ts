import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagsModule } from 'src/tags/tags.module'
import { TechnologiesModule } from 'src/technologies/technologies.module'

import { TemplateTag } from './entities/template-tag.entity'
import { Template } from './entities/template.entity'
import { DeleteTemplateTagRepository } from './repositories/delete-template-tag.repository'
import { DeleteTemplateRepository } from './repositories/delete.repository'
import { FindAllTemplatesRepository } from './repositories/find-all.repository'
import { FindTemplateByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingTemplateRepository } from './repositories/find-existing.repository'
import { PreloadTemplateRepository } from './repositories/preload.repository'
import { SaveTemplateTagRepository } from './repositories/save-template-tag.repository'
import { SaveTemplateRepository } from './repositories/save.repository'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateTag]), TechnologiesModule, TagsModule],
  controllers: [TemplatesController],
  providers: [
    TemplatesService,
    FindAllTemplatesRepository,
    FindTemplateByIdRepository,
    FindExistingTemplateRepository,
    SaveTemplateRepository,
    PreloadTemplateRepository,
    DeleteTemplateRepository,
    SaveTemplateTagRepository,
    DeleteTemplateTagRepository,
  ],
})
export class TemplatesModule {}
