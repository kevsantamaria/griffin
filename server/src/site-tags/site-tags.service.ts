import { Injectable } from '@nestjs/common'

import { CreateSiteTagDto } from './dto/create-site-tag.dto'
import { UpdateSiteTagDto } from './dto/update-site-tag.dto'

@Injectable()
export class SiteTagsService {
  create(createSiteTagDto: CreateSiteTagDto) {
    return 'This action adds a new siteTag'
  }

  findAll() {
    return `This action returns all siteTags`
  }

  findOne(id: number) {
    return `This action returns a #${id} siteTag`
  }

  update(id: number, updateSiteTagDto: UpdateSiteTagDto) {
    return `This action updates a #${id} siteTag`
  }

  remove(id: number) {
    return `This action removes a #${id} siteTag`
  }
}
