import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'

import { AuthenticatedGuard } from '../auth/guards/authenticated.guard.js'
import { CreateSiteDto } from './dto/create-site.dto.js'
import { PaginationDto } from './dto/pagination.dto.js'
import { UpdateSiteDto } from './dto/update-site.dto.js'
import { SitesService } from './sites.service.js'

@UseGuards(AuthenticatedGuard)
@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @Throttle({ write: {} })
  async create(@Body() createSiteDto: CreateSiteDto) {
    return { data: await this.sitesService.create(createSiteDto) }
  }

  @Get()
  @Throttle({ read: {} })
  async findAll(@Query() pagination: PaginationDto) {
    return { data: await this.sitesService.findAll(pagination) }
  }

  @Get('slug/:slug')
  @Throttle({ read: {} })
  async findBySlug(@Param('slug') slug: string) {
    return { data: await this.sitesService.findOneBySlug(slug) }
  }

  @Get(':id')
  @Throttle({ read: {} })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { data: await this.sitesService.findOne(id) }
  }

  @Patch(':id')
  @Throttle({ write: {} })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSiteDto: UpdateSiteDto) {
    return { data: await this.sitesService.update(id, updateSiteDto) }
  }

  @Delete(':id')
  @Throttle({ write: {} })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return { data: await this.sitesService.delete(id) }
  }
}
