import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

export class CreateSiteDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsUrl()
  @IsOptional()
  url: string

  @IsBoolean()
  @IsNotEmpty()
  isInternal: boolean

  @IsString()
  @IsOptional()
  notes: string

  @IsString()
  @IsNotEmpty()
  technologyName: string

  @IsNotEmptyObject()
  credentials: Record<string, Record<string, string>>

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagNames?: string[]
}
