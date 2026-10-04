import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard'

import { CreateSiteDto } from './dto/create-site.dto'
import { PaginationDto } from './dto/pagination.dto'
import { UpdateSiteDto } from './dto/update-site.dto'
import { SitesService } from './sites.service'

@UseGuards(AuthenticatedGuard)
@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @Throttle({ write: {} })
  async create(@Body() createSiteDto: CreateSiteDto) {
    return this.sitesService.create(createSiteDto)
  }

  @Get()
  @Throttle({ read: {} })
  async findAll(@Query() pagination: PaginationDto) {
    return this.sitesService.findAll(pagination)
  }

  @Get(':id')
  @Throttle({ read: {} })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sitesService.findOne(id)
  }

  @Patch(':id')
  @Throttle({ write: {} })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSiteDto: UpdateSiteDto) {
    return this.sitesService.update(id, updateSiteDto)
  }

  @Delete(':id')
  @Throttle({ write: {} })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.sitesService.delete(id)
  }
}
