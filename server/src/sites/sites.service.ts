import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { SiteTag } from 'src/sites/entities/site-tag.entity'
import { DeleteSiteTagRepository } from 'src/sites/repositories/delete-site-tag.repository'
import { SaveSiteTagRepository } from 'src/sites/repositories/save-site-tag.repository'
import { TagsService } from 'src/tags/tags.service'
import { TechnologiesService } from 'src/technologies/technologies.service'

import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'
import { Site } from './entities/site.entity'
import { DeleteSiteRepository } from './repositories/delete.repository'
import { FindAllSitesRepository } from './repositories/find-all.repository'
import { FindSiteByIdRepository } from './repositories/find-by-id.repository'
import { FindExistingSiteRepository } from './repositories/find-existing.repository'
import { PreloadSiteRepository } from './repositories/preload.repository'
import { SaveSiteRepository } from './repositories/save.repository'

@Injectable()
export class SitesService {
  constructor(
    private readonly findSiteById: FindSiteByIdRepository,
    private readonly findExistingSite: FindExistingSiteRepository,
    private readonly findAllSites: FindAllSitesRepository,
    private readonly saveSite: SaveSiteRepository,
    private readonly preloadSite: PreloadSiteRepository,
    private readonly removeSite: DeleteSiteRepository,
    private readonly technologiesService: TechnologiesService,
    private readonly tagsService: TagsService,
    private readonly saveSiteTag: SaveSiteTagRepository,
    private readonly deleteSiteTag: DeleteSiteTagRepository
  ) {}

  private toResponse(site: Site) {
    const { siteTags, ...rest } = site
    return {
      ...rest,
      tags: siteTags?.map((siteTag) => siteTag.tag.name) ?? [],
    }
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
    site.credentials = createSiteDto.credentials
    site.technology = existingTechnology
    site.technologyId = existingTechnology.id

    const savedSite = await this.saveSite.execute(site)

    if (createSiteDto.tagNames?.length) {
      const uniqueTagNames = [...new Set(createSiteDto.tagNames)]
      const siteTags: SiteTag[] = await Promise.all(
        uniqueTagNames.map(async (tagName) => {
          const tag = await this.tagsService.findOrCreate(tagName)

          const siteTag = new SiteTag()
          siteTag.siteId = savedSite.id
          siteTag.tagId = tag.id
          return siteTag
        })
      )
      await this.saveSiteTag.executeMany(siteTags)
    }

    return savedSite
  }

  async findAll() {
    const sites = await this.findAllSites.execute()
    return sites.map((site) => this.toResponse(site))
  }

  async findOne(id: number) {
    const site = await this.findSiteById.execute(id)
    if (!site) throw new NotFoundException('site not found')

    return this.toResponse(site)
  }

  async update(id: number, updateSiteDto: UpdateSiteDto) {
    const { tagNames, ...siteFields } = updateSiteDto
    const existingSite = await this.preloadSite.execute(id, siteFields)
    if (!existingSite) throw new NotFoundException('site not found')

    if (siteFields.name) {
      const conflict = await this.findExistingSite.execute({
        name: siteFields.name,
        excludeId: id,
      })
      if (conflict) throw new ConflictException('the site already exists')
    }

    const savedSite = await this.saveSite.execute(existingSite)

    if (tagNames) {
      const uniqueTagNames = [...new Set(tagNames)]
      const siteTags: SiteTag[] = []
      for (const tagName of uniqueTagNames) {
        const tag = await this.tagsService.findOrCreate(tagName)

        const siteTag = new SiteTag()
        siteTag.siteId = savedSite.id
        siteTag.tagId = tag.id
        siteTags.push(siteTag)
      }

      await this.deleteSiteTag.executeBySiteId(savedSite.id)
      await this.saveSiteTag.executeMany(siteTags)
    }

    return this.toResponse(savedSite)
  }

  async delete(id: number) {
    const result = await this.removeSite.execute(id)
    if (result.affected === 0) throw new NotFoundException('site not found')

    return result
  }
}
