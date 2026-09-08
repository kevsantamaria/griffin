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
    return this.tagsService.create(createTagDto)
  }

  @Get()
  @Throttle({ read: {} })
  findAll() {
    return this.tagsService.findAll()
  }

  @Delete(':id')
  @Throttle({ write: {} })
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id)
  }
}
