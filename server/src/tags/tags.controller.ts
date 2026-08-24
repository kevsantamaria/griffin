import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common'

import { CreateTagDto } from './dto/create-tag.dto'
import { TagsService } from './tags.service'

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body(ValidationPipe) createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto)
  }

  @Get()
  findAll() {
    return this.tagsService.findAll()
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id)
  }
}
