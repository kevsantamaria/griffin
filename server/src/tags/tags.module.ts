import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Tag } from './entities/tag.entity'
import { TagsController } from './tags.controller'
import { TagsService } from './tags.service'
import { FindAllTagsRepository } from './repositories/find-all.repository'
import { FindTagByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingTagRepository } from './repositories/find-existing.repository'
import { SaveTagRepository } from './repositories/save.repository'
import { UpdateTagRepository } from './repositories/update.repository'
import { DeleteTagRepository } from './repositories/delete.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [
    TagsService,
    FindAllTagsRepository,
    FindTagByIdRepository,
    FindExistingTagRepository,
    SaveTagRepository,
    UpdateTagRepository,
    DeleteTagRepository,
  ],
})
export class TagsModule {}
