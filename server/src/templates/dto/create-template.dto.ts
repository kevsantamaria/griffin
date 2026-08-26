import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'

import type { TemplateGroup } from '../entities/template.entity'

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsArray()
  @IsObject({ each: true })
  groups: TemplateGroup[]

  @IsString()
  @IsNotEmpty()
  technologyName: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagNames?: string[]
}
