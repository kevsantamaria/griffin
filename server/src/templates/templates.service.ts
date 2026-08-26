import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Tag } from 'src/tags/entities/tag.entity'
import { TagsService } from 'src/tags/tags.service'
import { Technology } from 'src/technologies/entities/technology.entity'
import { TechnologiesService } from 'src/technologies/technologies.service'
import { DeleteResult } from 'typeorm'

import { CreateTemplateDto } from './dto/create-template.dto'
import { UpdateTemplateDto } from './dto/update-template.dto'
import { TemplateTag } from './entities/template-tag.entity'
import { Template, TemplateGroup } from './entities/template.entity'
import { DeleteTemplateTagRepository } from './repositories/delete-template-tag.repository'
import { DeleteTemplateRepository } from './repositories/delete.repository'
import { FindAllTemplatesRepository } from './repositories/find-all.repository'
import { FindTemplateByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingTemplateRepository } from './repositories/find-existing.repository'
import { PreloadTemplateRepository } from './repositories/preload.repository'
import { SaveTemplateTagRepository } from './repositories/save-template-tag.repository'
import { SaveTemplateRepository } from './repositories/save.repository'

type TemplateRes = {
  tags: string[]
  id: number
  name: string
  groups: TemplateGroup[]
  technologyId: number
  technology: Technology
}

@Injectable()
export class TemplatesService {
  constructor(
    private readonly findExistingTemplate: FindExistingTemplateRepository,
    private readonly findAllTemplates: FindAllTemplatesRepository,
    private readonly findTemplateById: FindTemplateByIdRepository,
    private readonly saveTemplate: SaveTemplateRepository,
    private readonly preloadTemplate: PreloadTemplateRepository,
    private readonly removeTemplate: DeleteTemplateRepository,
    private readonly saveTemplateTag: SaveTemplateTagRepository,
    private readonly deleteTemplateTag: DeleteTemplateTagRepository,
    private readonly technologiesService: TechnologiesService,
    private readonly tagsService: TagsService
  ) {}

  private toResponse(template: Template): TemplateRes {
    const { templateTags, ...rest } = template
    return {
      ...rest,
      tags: templateTags?.map((templateTag) => templateTag.tag.name) ?? [],
    }
  }

  private async createTemplateTags(tags: Tag[], templateId: number): Promise<void> {
    const templateTags = tags.map((tag) => {
      const templateTag = new TemplateTag()

      templateTag.templateId = templateId
      templateTag.tagId = tag.id

      return templateTag
    })

    await this.deleteTemplateTag.executeByTemplateId(templateId)
    await this.saveTemplateTag.executeMany(templateTags)
  }

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const existingTemplate = await this.findExistingTemplate.execute({
      name: createTemplateDto.name,
    })
    if (existingTemplate) throw new ConflictException('ya existe plantilla pipo')

    const template = new Template()
    template.name = createTemplateDto.name
    template.groups = createTemplateDto.groups

    const existingTechnology = await this.technologiesService.findOrCreate(
      createTemplateDto.technologyName
    )

    template.technology = existingTechnology

    const savedTemplate = await this.saveTemplate.execute(template)

    if (createTemplateDto.tagNames?.length) {
      const tags = await this.tagsService.findOrCreate(createTemplateDto.tagNames)
      await this.createTemplateTags(tags, savedTemplate.id)
    }

    return savedTemplate
  }

  async findAll(): Promise<TemplateRes[] | []> {
    const templates = await this.findAllTemplates.execute()

    return templates.map((template) => this.toResponse(template))
  }

  async findOne(id: number): Promise<TemplateRes> {
    const template = await this.findTemplateById.execute(id)
    if (!template) throw new NotFoundException('no existe la plantilla tanke')

    return this.toResponse(template)
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto): Promise<Template> {
    const existingTemplate = await this.preloadTemplate.execute(id, updateTemplateDto)
    if (!existingTemplate) throw new NotFoundException('esta plantilla no existe pepillo')

    if (updateTemplateDto.name) {
      const conflict = await this.findExistingTemplate.execute({
        name: updateTemplateDto.name,
        excludeId: id,
      })
      if (conflict) throw new ConflictException('ya existe tanke, actualiza con otro nombre')
    }

    if (updateTemplateDto.technologyName) {
      const existingTechnology = await this.technologiesService.findOrCreate(
        updateTemplateDto.technologyName
      )
      existingTemplate.technology = existingTechnology
    }
    const savedTemplate = await this.saveTemplate.execute(existingTemplate)

    if (updateTemplateDto.tagNames?.length) {
      const tags = await this.tagsService.findOrCreate(updateTemplateDto.tagNames)
      await this.createTemplateTags(tags, savedTemplate.id)
    }

    return savedTemplate
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.removeTemplate.execute(id)
    if (result.affected === 0) throw new NotFoundException('plantilla not found')

    return result
  }
}
