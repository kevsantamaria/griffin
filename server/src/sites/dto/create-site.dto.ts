import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator'
import { CredentialGroupDto } from 'src/common/dto/credential.dto'

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
