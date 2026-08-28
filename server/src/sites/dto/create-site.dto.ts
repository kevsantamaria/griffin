import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator'

export class CredentialFieldDto {
  @IsString()
  @IsNotEmpty()
  label: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsEnum(['text', 'password', 'email', 'url'])
  type: 'text' | 'password' | 'email' | 'url'
}

export class CredentialGroupDto {
  @IsString()
  @IsNotEmpty()
  header: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CredentialFieldDto)
  fields: CredentialFieldDto[]
}

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CredentialGroupDto)
  credentials: CredentialGroupDto[]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagNames?: string[]
}
