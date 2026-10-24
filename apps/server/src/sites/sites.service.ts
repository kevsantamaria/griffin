import type { AllSitesRes, SingleSiteRes } from '@griffin/schemas'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { slugify } from '../common/utils/slug.js'
import { EncryptionService } from '../encryption/encryption.service.js'
import { SiteTag } from './entities/site-tag.entity.js'
import { DeleteSiteTagRepository } from './repositories/delete-site-tag.repository.js'
import { SaveSiteTagRepository } from './repositories/save-site-tag.repository.js'
import { Tag } from '../tags/entities/tag.entity.js'
import { TagsService } from '../tags/tags.service.js'
import { TechnologiesService } from '../technologies/technologies.service.js'
import { DeleteResult } from 'typeorm'

import { CreateSiteDto } from './dto/create-site.dto.js'
import { PaginationDto } from './dto/pagination.dto.js'
import { UpdateSiteDto } from './dto/update-site.dto.js'
import { Site } from './entities/site.entity.js'
import { DeleteSiteRepository } from './repositories/delete.repository.js'
import { FindAllSitesRepository } from './repositories/find-all.repository.js'
import { FindSiteByIdRepository } from './repositories/find-by-id.repository.js'
import { FindSiteBySlugRepository } from './repositories/find-by-slug.repository.js'
import { FindExistingSiteRepository } from './repositories/find-existing.repository.js'
import { PreloadSiteRepository } from './repositories/preload.repository.js'
import { SaveSiteRepository } from './repositories/save.repository.js'

@Injectable()
export class SitesService {
  constructor(
    private readonly findSiteById: FindSiteByIdRepository,
    private readonly findSiteBySlug: FindSiteBySlugRepository,
    private readonly findExistingSite: FindExistingSiteRepository,
    private readonly findAllSites: FindAllSitesRepository,
    private readonly saveSite: SaveSiteRepository,
    private readonly preloadSite: PreloadSiteRepository,
    private readonly removeSite: DeleteSiteRepository,
    private readonly saveSiteTag: SaveSiteTagRepository,
    private readonly deleteSiteTag: DeleteSiteTagRepository,
    private readonly technologiesService: TechnologiesService,
    private readonly tagsService: TagsService,
    private readonly encryptionService: EncryptionService
  ) {}

  private toSingleSiteRes(site: Site): SingleSiteRes {
    return {
      id: site.id,
      name: site.name,
      technology: site.technology.name,
      isInternal: site.isInternal,
      url: site.url,
      notes: site.notes,
      tags: site.siteTags.map((siteTag) => siteTag.tag),
      slug: site.slug,
      credentials: this.encryptionService.decrypt(site.credentials),
      createdAt: site.createdAt,
      updatedAt: site.updatedAt,
    }
  }

  private toAllSitesRes(site: Site): AllSitesRes {
    return {
      id: site.id,
      name: site.name,
      url: site.url,
      isInternal: site.isInternal,
      technology: site.technology.name,
      tags: site.siteTags.map((siteTag) => siteTag.tag),
      slug: site.slug,
    }
  }

  private async createSiteTags(tags: Tag[], siteId: number): Promise<void> {
    const siteTags = tags.map((tag) => {
      const siteTag = new SiteTag()

      siteTag.siteId = siteId
      siteTag.tagId = tag.id

      return siteTag
    })

    await this.deleteSiteTag.executeBySiteId(siteId)
    await this.saveSiteTag.executeMany(siteTags)
  }

  async create(createSiteDto: CreateSiteDto): Promise<Site> {
    const existingSite = await this.findExistingSite.execute({ name: createSiteDto.name })
    if (existingSite)
      throw new ConflictException(`Site with name ${createSiteDto.name} already exists`)

    const existingTechnology = await this.technologiesService.findOrCreate(
      createSiteDto.technologyName
    )

    const site = new Site()
    site.name = createSiteDto.name
    site.notes = createSiteDto.notes ?? null
    site.isInternal = createSiteDto.isInternal
    site.url = createSiteDto.url ?? null
    site.credentials = this.encryptionService.encrypt(createSiteDto.credentials)
    site.technology = existingTechnology
    site.technologyId = existingTechnology.id
    site.slug = slugify(createSiteDto.name)

    const savedSite = await this.saveSite.execute(site)

    if (createSiteDto.tagNames?.length) {
      const tags = await this.tagsService.findOrCreate(createSiteDto.tagNames)
      await this.createSiteTags(tags, savedSite.id)
    }

    return savedSite
  }

  async findAll(pagination: PaginationDto): Promise<AllSitesRes[]> {
    const sites = await this.findAllSites.execute(pagination)
    return sites.map((site) => this.toAllSitesRes(site))
  }

  async findOne(id: number): Promise<SingleSiteRes> {
    const site = await this.findSiteById.execute(id)
    if (!site) throw new NotFoundException('site not found')

    return this.toSingleSiteRes(site)
  }

  async findOneBySlug(slug: string): Promise<SingleSiteRes> {
    const site = await this.findSiteBySlug.execute(slug)
    if (!site) throw new NotFoundException('site not found')

    return this.toSingleSiteRes(site)
  }

  async update(id: number, updateSiteDto: UpdateSiteDto): Promise<Site> {
    const { credentials, tagNames, technologyName, ...siteFields } = updateSiteDto
    const existingSite = await this.preloadSite.execute(id, updateSiteDto)
    if (!existingSite) throw new NotFoundException('site not found')

    if (siteFields.name) {
      const conflict = await this.findExistingSite.execute({
        name: siteFields.name,
        excludeId: id,
      })
      if (conflict) throw new ConflictException('the site already exists')

      existingSite.slug = slugify(siteFields.name)
    }

    if (technologyName) {
      const existingTechnology = await this.technologiesService.findOrCreate(technologyName)
      existingSite.technology = existingTechnology
    }

    if (credentials) {
      existingSite.credentials = this.encryptionService.encrypt(credentials)
    }

    const savedSite = await this.saveSite.execute(existingSite)

    if (tagNames?.length) {
      const tags = await this.tagsService.findOrCreate(tagNames)
      await this.createSiteTags(tags, savedSite.id)
    }

    return savedSite
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.removeSite.execute(id)
    if (result.affected === 0) throw new NotFoundException('site not found')

    return result
  }
}
