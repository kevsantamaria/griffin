import { Injectable } from '@nestjs/common'

import { CreateTemplateTagDto } from './dto/create-template-tag.dto'
import { UpdateTemplateTagDto } from './dto/update-template-tag.dto'

@Injectable()
export class TemplateTagsService {
  create(createTemplateTagDto: CreateTemplateTagDto) {
    return 'This action adds a new templateTag'
  }

  findAll() {
    return `This action returns all templateTags`
  }

  findOne(id: number) {
    return `This action returns a #${id} templateTag`
  }

  update(id: number, updateTemplateTagDto: UpdateTemplateTagDto) {
    return `This action updates a #${id} templateTag`
  }

  remove(id: number) {
    return `This action removes a #${id} templateTag`
  }
}
