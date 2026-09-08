import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

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
