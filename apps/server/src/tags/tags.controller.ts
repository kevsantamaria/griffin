import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard'

import { CreateTagDto } from './dto/create-tag.dto'
import { TagsService } from './tags.service'

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
