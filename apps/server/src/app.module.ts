import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { AuthModule } from './auth/auth.module.js'
import { DatabaseModule } from './database.module.js'
import { EncryptionModule } from './encryption/encryption.module.js'
import { SitesModule } from './sites/sites.module.js'
import { TagsModule } from './tags/tags.module.js'
import { TechnologiesModule } from './technologies/technologies.module.js'
import { TemplatesModule } from './templates/templates.module.js'
import { UsersModule } from './users/users.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      { name: 'auth', ttl: 60000, limit: 5 },
      { name: 'read', ttl: 60000, limit: 1000 },
      { name: 'write', ttl: 60000, limit: 100 },
      { name: 'search', ttl: 60000, limit: 300 },
    ]),
    DatabaseModule,
    SitesModule,
    TagsModule,
    UsersModule,
    TechnologiesModule,
    TemplatesModule,
    EncryptionModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
