import { AllTemplatesRes, SingleTemplateRes } from '@griffin/schemas'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { slugify } from '../common/utils/slug.js'
import { Tag } from '../tags/entities/tag.entity.js'
import { TagsService } from '../tags/tags.service.js'
import { TechnologiesService } from '../technologies/technologies.service.js'
import { DeleteResult } from 'typeorm'

import { CreateTemplateDto } from './dto/create-template.dto.js'
import { UpdateTemplateDto } from './dto/update-template.dto.js'
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

@Injectable()
export class TemplatesService {
  constructor(
    private readonly findExistingTemplate: FindExistingTemplateRepository,
    private readonly findAllTemplates: FindAllTemplatesRepository,
    private readonly findTemplateById: FindTemplateByIdRepository,
    private readonly findTemplateBySlug: FindTemplateBySlugRepository,
    private readonly saveTemplate: SaveTemplateRepository,
    private readonly preloadTemplate: PreloadTemplateRepository,
    private readonly removeTemplate: DeleteTemplateRepository,
    private readonly saveTemplateTag: SaveTemplateTagRepository,
    private readonly deleteTemplateTag: DeleteTemplateTagRepository,
    private readonly technologiesService: TechnologiesService,
    private readonly tagsService: TagsService
  ) {}

  private toSingleTemplateRes(template: Template): SingleTemplateRes {
    return {
      id: template.id,
      name: template.name,
      technology: template.technology.name,
      groups: template.groups,
      tags: template.templateTags.map((templateTag) => templateTag.tag),
      slug: template.slug,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    }
  }

  private toAllTemplatesRes(template: Template): AllTemplatesRes {
    return {
      id: template.id,
      name: template.name,
      technology: template.technology.name,
      tags: template.templateTags.map((templateTag) => templateTag.tag),
      slug: template.slug,
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
    template.slug = slugify(createTemplateDto.name)

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

  async findAll(): Promise<AllTemplatesRes[]> {
    const templates = await this.findAllTemplates.execute()

    return templates.map((template) => this.toAllTemplatesRes(template))
  }

  async findOne(id: number): Promise<SingleTemplateRes> {
    const template = await this.findTemplateById.execute(id)
    if (!template) throw new NotFoundException('no existe la plantilla tanke')

    return this.toSingleTemplateRes(template)
  }

  async findOneBySlug(slug: string): Promise<SingleTemplateRes> {
    const template = await this.findTemplateBySlug.execute(slug)
    if (!template) throw new NotFoundException('no existe la plantilla tanke')

    return this.toSingleTemplateRes(template)
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
      existingTemplate.slug = slugify(updateTemplateDto.name)
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
