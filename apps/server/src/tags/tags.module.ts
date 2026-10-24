import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Tag } from './entities/tag.entity.js'
import { DeleteTagRepository } from './repositories/delete.repository.js'
import { FindAllTagsRepository } from './repositories/find-all.repository.js'
import { FindTagByNameRepository } from './repositories/find-by-name.repository.js'
import { FindExistingTagRepository } from './repositories/find-existing.repository.js'
import { SaveTagRepository } from './repositories/save.repository.js'
import { TagsController } from './tags.controller.js'
import { TagsService } from './tags.service.js'

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
