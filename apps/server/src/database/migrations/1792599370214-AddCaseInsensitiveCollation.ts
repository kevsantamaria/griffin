import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCaseInsensitiveCollation1792599370214 implements MigrationInterface {
  name = 'AddCaseInsensitiveCollation1792599370214'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE COLLATION IF NOT EXISTS case_insensitive (
      provider = icu,
      locale = 'und-u-ks-level1',
      deterministic = false
    )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP COLLATION IF EXISTS case_insensitive`)
  }
}
