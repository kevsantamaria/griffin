import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CredentialGroupDto } from 'src/common/types'
import { EncryptionService } from 'src/encryption/encryption.service'
import { SiteTag } from 'src/sites/entities/site-tag.entity'
import { DeleteSiteTagRepository } from 'src/sites/repositories/delete-site-tag.repository'
import { SaveSiteTagRepository } from 'src/sites/repositories/save-site-tag.repository'
import { Tag } from 'src/tags/entities/tag.entity'
import { TagsService } from 'src/tags/tags.service'
import { TechnologiesService } from 'src/technologies/technologies.service'
import { DeleteResult } from 'typeorm'

import { CreateSiteDto } from './dto/create-site.dto'
import { PaginationDto } from './dto/pagination.dto'
import { UpdateSiteDto } from './dto/update-site.dto'
import { Site } from './entities/site.entity'
import { DeleteSiteRepository } from './repositories/delete.repository'
import { FindAllSitesRepository } from './repositories/find-all.repository'
import { FindSiteByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingSiteRepository } from './repositories/find-existing.repository'
import { PreloadSiteRepository } from './repositories/preload.repository'
import { SaveSiteRepository } from './repositories/save.repository'

type SiteRes = {
  tags: string[]
  id: number
  name: string
  url: string
  isInternal: boolean
  notes: string
  technologyName: string
  credentials: CredentialGroupDto[]
  createdAt: Date
  updatedAt: Date
}

@Injectable()
export class SitesService {
  constructor(
    private readonly findSiteById: FindSiteByIdRepository,
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

  private toResponse(site: Site): SiteRes {
    const {
      id,
      name,
      url,
      technology,
      isInternal,
      notes,
      siteTags,
      credentials,
      createdAt,
      updatedAt,
    } = site
    return {
      id,
      name,
      url,
      technologyName: technology.name,
      isInternal,
      notes,
      tags: siteTags?.map((siteTag) => siteTag.tag.name) ?? [],
      credentials: this.encryptionService.decrypt(credentials),
      createdAt,
      updatedAt,
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
    site.notes = createSiteDto.notes
    site.isInternal = createSiteDto.isInternal
    site.url = createSiteDto.url
    site.credentials = this.encryptionService.encrypt(createSiteDto.credentials)
    site.technology = existingTechnology
    site.technologyId = existingTechnology.id

    const savedSite = await this.saveSite.execute(site)

    if (createSiteDto.tagNames?.length) {
      const tags = await this.tagsService.findOrCreate(createSiteDto.tagNames)
      await this.createSiteTags(tags, savedSite.id)
    }

    return savedSite
  }

  async findAll(pagination: PaginationDto): Promise<SiteRes[]> {
    const sites = await this.findAllSites.execute(pagination)
    return sites.map((site) => this.toResponse(site))
  }

  async findOne(id: number): Promise<SiteRes> {
    const site = await this.findSiteById.execute(id)
    if (!site) throw new NotFoundException('site not found')

    return this.toResponse(site)
  }

  async update(id: number, updateSiteDto: UpdateSiteDto): Promise<Site> {
    const { credentials, tagNames, technologyName, ...siteFields } = updateSiteDto
    const existingSite = await this.preloadSite.execute(id, siteFields)
    if (!existingSite) throw new NotFoundException('site not found')

    if (siteFields.name) {
      const conflict = await this.findExistingSite.execute({
        name: siteFields.name,
        excludeId: id,
      })
      if (conflict) throw new ConflictException('the site already exists')
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
