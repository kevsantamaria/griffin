import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard'

import { CreateTemplateDto } from './dto/create-template.dto'
import { UpdateTemplateDto } from './dto/update-template.dto'
import { TemplatesService } from './templates.service'

@UseGuards(AuthenticatedGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @Throttle({ write: {} })
  async create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto)
  }

  @Get()
  @Throttle({ read: {} })
  async findAll() {
    return this.templatesService.findAll()
  }

  @Get(':id')
  @Throttle({ read: {} })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.templatesService.findOne(id)
  }

  @Patch(':id')
  @Throttle({ write: {} })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTemplateDto: UpdateTemplateDto
  ) {
    return this.templatesService.update(id, updateTemplateDto)
  }

  @Delete(':id')
  @Throttle({ write: {} })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.templatesService.remove(id)
  }
}
