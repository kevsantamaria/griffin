import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export type CredentialField = {
  label: string
  content: string
  type: 'text' | 'password' | 'email' | 'url'
}

export type CredentialGroup = {
  header: string
  fields: CredentialField[]
}

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