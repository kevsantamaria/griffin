import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from './database.module'
import { SitesModule } from './sites/sites.module'
import { TagsModule } from './tags/tags.module'
import { TechnologiesModule } from './technologies/technologies.module'
import { TemplatesModule } from './templates/templates.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SitesModule,
    TagsModule,
    UsersModule,
    TechnologiesModule,
    TemplatesModule,
  ],
})
export class AppModule {}
