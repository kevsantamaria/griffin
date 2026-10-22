import { DataSource } from 'typeorm'

import { databaseOptions } from './database.options'

process.loadEnvFile('.env')

export default new DataSource({
  ...databaseOptions((key) => process.env[key]),
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
})