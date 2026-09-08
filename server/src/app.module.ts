import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database.module'
import { EncryptionModule } from './encryption/encryption.module'
import { SitesModule } from './sites/sites.module'
import { TagsModule } from './tags/tags.module'
import { TechnologiesModule } from './technologies/technologies.module'
import { TemplatesModule } from './templates/templates.module'
import { UsersModule } from './users/users.module'

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
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
