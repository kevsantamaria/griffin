import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'

import { AuthenticatedGuard } from '../auth/guards/authenticated.guard.js'
import { CreateTechnologyDto } from './dto/create-technology.dto.js'
import { UpdateTechnologyDto } from './dto/update-technology.dto.js'
import { TechnologiesService } from './technologies.service.js'

@UseGuards(AuthenticatedGuard)
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  @Throttle({ write: {} })
  async create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return { data: await this.technologiesService.create(createTechnologyDto) }
  }

  @Get()
  @Throttle({ read: {} })
  async findAll() {
    return { data: await this.technologiesService.findAll() }
  }

  @Get(':id')
  @Throttle({ read: {} })
  async findOne(@Param('id') id: string) {
    return { data: await this.technologiesService.findOne(+id) }
  }

  @Patch(':id')
  @Throttle({ write: {} })
  async update(@Param('id') id: string, @Body() updateTechnologyDto: UpdateTechnologyDto) {
    return { data: await this.technologiesService.update(+id, updateTechnologyDto) }
  }

  @Delete(':id')
  @Throttle({ write: {} })
  async remove(@Param('id') id: string) {
    return { data: await this.technologiesService.remove(+id) }
  }
}
