import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { CreateTagDto } from './dto/create-tag.dto'
import { Tag } from './entities/tag.entity'
import { DeleteTagRepository } from './repositories/delete.repository'
import { FindAllTagsRepository } from './repositories/find-all.repository'
import { FindTagByNameRepository } from './repositories/find-by-name.repository'
import { FindExistingTagRepository } from './repositories/find-existing.repository'
import { SaveTagRepository } from './repositories/save.repository'

@Injectable()
export class TagsService {
  constructor(
    private readonly findTagByName: FindTagByNameRepository,
    private readonly findExistingTag: FindExistingTagRepository,
    private readonly findAllTags: FindAllTagsRepository,
    private readonly saveTag: SaveTagRepository,
    private readonly deleteTag: DeleteTagRepository
  ) {}

  async create(createTagDto: CreateTagDto) {
    const existingTag = await this.findExistingTag.execute({ name: createTagDto.name })
    if (existingTag) throw new ConflictException('The tag already exists')

    const tag = new Tag()
    tag.name = createTagDto.name

    return await this.saveTag.execute(tag)
  }

  async findAll(): Promise<Tag[]> {
    return await this.findAllTags.execute()
  }

  async remove(id: number) {
    const result = await this.deleteTag.execute(id)
    if (result.affected === 0) throw new NotFoundException(`Tag with id '${id}' not found`)

    return result
  }

  async findOrCreate(names: string[]): Promise<Tag[]> {
    const tagNames = [...new Set(names)]

    const existingTags = await Promise.all(
      tagNames.map(async (name) => {
        const tag = await this.findTagByName.execute(name)

        if (!tag) {
          const newTag = new Tag()
          newTag.name = name

          return await this.saveTag.execute(newTag)
        }

        return tag
      })
    )

    return existingTags
  }
}
