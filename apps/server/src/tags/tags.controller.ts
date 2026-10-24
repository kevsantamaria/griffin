import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard.js'

import { CreateTagDto } from './dto/create-tag.dto.js'
import { TagsService } from './tags.service.js'

@UseGuards(AuthenticatedGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @Throttle({ write: {} })
  async create(@Body() createTagDto: CreateTagDto) {
    return { data: await this.tagsService.create(createTagDto) }
  }

  @Get()
  @Throttle({ read: {} })
  async findAll() {
    return { data: await this.tagsService.findAll() }
  }

  @Delete(':id')
  @Throttle({ write: {} })
  async remove(@Param('id') id: string) {
    return { data: await this.tagsService.remove(+id) }
  }
}
