import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { CreateTemplateTagDto } from './dto/create-template-tag.dto'
import { UpdateTemplateTagDto } from './dto/update-template-tag.dto'
import { TemplateTagsService } from './template-tags.service'

@Controller('template-tags')
export class TemplateTagsController {
  constructor(private readonly templateTagsService: TemplateTagsService) {}

  @Post()
  create(@Body() createTemplateTagDto: CreateTemplateTagDto) {
    return this.templateTagsService.create(createTemplateTagDto)
  }

  @Get()
  findAll() {
    return this.templateTagsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateTagsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateTagDto: UpdateTemplateTagDto) {
    return this.templateTagsService.update(+id, updateTemplateTagDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateTagsService.remove(+id)
  }
}
