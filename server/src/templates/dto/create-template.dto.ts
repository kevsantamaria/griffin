import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

export class TemplateFieldDto {
  @IsString()
  @IsNotEmpty()
  label: string

  @IsEnum(['text', 'password', 'email', 'url'])
  type: 'text' | 'password' | 'email' | 'url'
}

export class TemplateGroupDto {
  @IsString()
  @IsNotEmpty()
  header: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateFieldDto)
  fields: TemplateFieldDto[]
}

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateGroupDto)
  groups: TemplateGroupDto[]

  @IsString()
  @IsNotEmpty()
  technologyName: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagNames?: string[]
}
