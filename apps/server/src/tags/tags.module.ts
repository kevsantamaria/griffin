import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Tag } from './entities/tag.entity'
import { DeleteTagRepository } from './repositories/delete.repository'
import { FindAllTagsRepository } from './repositories/find-all.repository'
import { FindTagByNameRepository } from './repositories/find-by-name.repository'
import { FindExistingTagRepository } from './repositories/find-existing.repository'
import { SaveTagRepository } from './repositories/save.repository'
import { TagsController } from './tags.controller'
import { TagsService } from './tags.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [
    TagsService,
    FindAllTagsRepository,
    FindTagByNameRepository,
    FindExistingTagRepository,
    SaveTagRepository,
    DeleteTagRepository,
  ],
  exports: [TagsService],
})
export class TagsModule {}
