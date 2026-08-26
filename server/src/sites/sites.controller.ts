import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common'

import { CreateSiteDto } from './dto/create-site.dto'
import { PaginationDto } from './dto/pagination.dto'
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
  async findAll(@Query() pagination: PaginationDto) {
    return this.sitesService.findAll(pagination)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sitesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateSiteDto: UpdateSiteDto
  ) {
    return this.sitesService.update(id, updateSiteDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.sitesService.delete(id)
  }
}
