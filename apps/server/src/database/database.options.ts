import type { DataSourceOptions } from 'typeorm'

type GetEnv = (key: string) => string | undefined

export function databaseOptions(getEnv: GetEnv): DataSourceOptions {
  return {
    type: 'postgres',
    host: getEnv('DB_HOST'),
    port: Number(getEnv('DB_PORT')),
    username: getEnv('DB_USER'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
  }
}
