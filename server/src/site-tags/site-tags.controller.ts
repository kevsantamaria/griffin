import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { CreateSiteTagDto } from './dto/create-site-tag.dto'
import { UpdateSiteTagDto } from './dto/update-site-tag.dto'
import { SiteTagsService } from './site-tags.service'

@Controller('site-tags')
export class SiteTagsController {
  constructor(private readonly siteTagsService: SiteTagsService) {}

  @Post()
  create(@Body() createSiteTagDto: CreateSiteTagDto) {
    return this.siteTagsService.create(createSiteTagDto)
  }

  @Get()
  findAll() {
    return this.siteTagsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteTagsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteTagDto: UpdateSiteTagDto) {
    return this.siteTagsService.update(+id, updateSiteTagDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteTagsService.remove(+id)
  }
}
