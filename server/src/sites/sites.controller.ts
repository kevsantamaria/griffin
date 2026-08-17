import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common'

import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'
import { SitesService } from './sites.service'

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  async create(@Body(ValidationPipe) createSiteDto: CreateSiteDto) {
    return this.sitesService.create(createSiteDto)
  }

  @Get()
  async findAll() {
    return this.sitesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sitesService.findOne(+id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateSiteDto: UpdateSiteDto) {
    return this.sitesService.update(+id, updateSiteDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sitesService.delete(+id)
  }
}
