import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Template } from './entities/template.entity'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
import { FindAllTemplatesRepository } from './repositories/find-all.repository'
import { FindTemplateByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingTemplateRepository } from './repositories/find-existing.repository'
import { SaveTemplateRepository } from './repositories/save.repository'
import { UpdateTemplateRepository } from './repositories/update.repository'
import { DeleteTemplateRepository } from './repositories/delete.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplatesController],
  providers: [
    TemplatesService,
    FindAllTemplatesRepository,
    FindTemplateByIdRepository,
    FindExistingTemplateRepository,
    SaveTemplateRepository,
    UpdateTemplateRepository,
    DeleteTemplateRepository,
  ],
})
export class TemplatesModule {}
