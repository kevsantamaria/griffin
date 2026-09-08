import { ConsoleLogger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import pgSession from 'connect-pg-simple'
import session from 'express-session'
import passport from 'passport'
import pg from 'pg'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'credentials-manager',
      logLevels: ['log'],
    }),
    cors: {
      origin: 'http://localhost:5173',
      methods: ['POST', 'GET', 'PATCH', 'DELETE'],
      credentials: true,
    },
  })

  const config = app.get(ConfigService)

  const pgPool = new pg.Pool({
    host: config.getOrThrow<string>('DB_HOST') || 'localhost',
    port: parseInt(config.getOrThrow<string>('DB_PORT') || '5432', 10),
    user: config.getOrThrow<string>('DB_USER') || 'postgres',
    password: config.getOrThrow<string>('DB_PASSWORD') || 'qwerty123',
    database: config.getOrThrow<string>('DB_NAME') || 'credentials_manager_db',
  })

  const PgSession = pgSession(session)

  const store = new PgSession({
    pool: pgPool,
    createTableIfMissing: true,
    tableName: 'sessions',
  })

  app.use(
    session({
      name: 'credentials-manager.sid',
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24, // 24h
      },
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))

  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
