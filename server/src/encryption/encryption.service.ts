import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CredentialGroup, CredentialGroupDto } from 'src/common/types'

@Injectable()
export class EncryptionService {
  private readonly key: Buffer

  constructor(private readonly configService: ConfigService) {
    const rawKey = this.configService.get<string>('ENCRYPTION_KEY')
    if (!rawKey || rawKey.length !== 64) {
      throw new InternalServerErrorException(
        'ENCRYPTION_KEY must be a 64-character hex string (32 bytes)'
      )
    }
    this.key = Buffer.from(rawKey, 'hex')
  }

  encrypt(data: CredentialGroupDto[]): string {
    const iv = randomBytes(12)
    const cipher = createCipheriv('aes-256-gcm', this.key, iv)

    const encrypted = Buffer.concat([cipher.update(JSON.stringify(data), 'utf8'), cipher.final()])

    const authTag = cipher.getAuthTag()

    return Buffer.concat([iv, authTag, encrypted]).toString('base64')
  }

  decrypt(encryptedBase64: string): CredentialGroup[] {
    const buffer = Buffer.from(encryptedBase64, 'base64')

    const iv = buffer.subarray(0, 12)
    const authTag = buffer.subarray(12, 28)
    const encrypted = buffer.subarray(28)

    const decipher = createDecipheriv('aes-256-gcm', this.key, iv)
    decipher.setAuthTag(authTag)

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])

    return JSON.parse(decrypted.toString('utf8'))
  }
}
