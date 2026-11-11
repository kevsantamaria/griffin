import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'

import { AuthenticatedGuard } from '../auth/guards/authenticated.guard.js'
import { CreateTemplateDto } from './dto/create-template.dto.js'
import { UpdateTemplateDto } from './dto/update-template.dto.js'
import { TemplatesService } from './templates.service.js'

@UseGuards(AuthenticatedGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @Throttle({ write: {} })
  async create(@Body() createTemplateDto: CreateTemplateDto) {
    return { data: await this.templatesService.create(createTemplateDto) }
  }

  @Get()
  @Throttle({ read: {} })
  async findAll() {
    return { data: await this.templatesService.findAll() }
  }

  @Get('slug/:slug')
  @Throttle({ read: {} })
  async findBySlug(@Param('slug') slug: string) {
    return { data: await this.templatesService.findOneBySlug(slug) }
  }

  @Get(':id')
  @Throttle({ read: {} })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { data: await this.templatesService.findOne(id) }
  }

  @Patch(':id')
  @Throttle({ write: {} })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTemplateDto: UpdateTemplateDto
  ) {
    return { data: await this.templatesService.update(id, updateTemplateDto) }
  }

  @Delete(':id')
  @Throttle({ write: {} })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return { data: await this.templatesService.remove(id) }
  }
}
