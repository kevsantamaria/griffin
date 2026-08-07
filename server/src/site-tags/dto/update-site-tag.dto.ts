import { PartialType } from '@nestjs/mapped-types'

import { CreateSiteTagDto } from './create-site-tag.dto'

export class UpdateSiteTagDto extends PartialType(CreateSiteTagDto) {}
