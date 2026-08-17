import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Tag } from './entities/tag.entity'
import { DeleteTagRepository } from './repositories/delete.repository'
import { FindAllTagsRepository } from './repositories/find-all.repository'
import { FindTagByIdRepository } from './repositories/find-by-id.repository'
import { FindTagByNameRepository } from './repositories/find-by-name.repository'
import { FindExistingTagRepository } from './repositories/find-existing.repository'
import { PreloadTagRepository } from './repositories/preload.repository'
import { SaveTagRepository } from './repositories/save.repository'

@Injectable()
export class TagsService {
  constructor(
    private readonly findTagById: FindTagByIdRepository,
    private readonly findTagByName: FindTagByNameRepository,
    private readonly findExistingTag: FindExistingTagRepository,
    private readonly findAllTags: FindAllTagsRepository,
    private readonly saveTag: SaveTagRepository,
    private readonly preloadTag: PreloadTagRepository,
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

  findOne(id: number) {
    return `This action returns a #${id} tag`
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`
  }

  async remove(id: number) {
    const result = await this.deleteTag.execute(id)
    if (result.affected === 0) throw new NotFoundException(`Tag with id '${id}' not found`)

    return result
  }

  async findOrCreate(name: string) {
    const existingTag = await this.findTagByName.execute(name)
    if (!existingTag) {
      const tag = new Tag()
      tag.name = name

      return await this.saveTag.execute(tag)
    }

    return existingTag
  }
}
