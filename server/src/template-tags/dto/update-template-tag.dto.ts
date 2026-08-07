import { PartialType } from '@nestjs/mapped-types'

import { CreateTemplateTagDto } from './create-template-tag.dto'

export class UpdateTemplateTagDto extends PartialType(CreateTemplateTagDto) {}
