import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNameCollation1792601228460 implements MigrationInterface {
  name = 'AddNameCollation1792601228460'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" ALTER COLUMN "name" TYPE character varying(50) COLLATE "case_insensitive"`
    )
    await queryRunner.query(
      `ALTER TABLE "technologies" ALTER COLUMN "name" TYPE character varying(50) COLLATE "case_insensitive"`
    )
    await queryRunner.query(
      `ALTER TABLE "sites" ALTER COLUMN "name" TYPE character varying(100) COLLATE "case_insensitive" USING "name"::varchar(100)`
    )
    await queryRunner.query(
      `ALTER TABLE "templates" ALTER COLUMN "name" TYPE character varying(100) COLLATE "case_insensitive"`
    )
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "UQ_5624219dd33b4644599d4d4b231" UNIQUE ("name")`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "UQ_5624219dd33b4644599d4d4b231"`
    )
    await queryRunner.query(
      `ALTER TABLE "templates" ALTER COLUMN "name" TYPE character varying(100) COLLATE pg_catalog."default"`
    )
    await queryRunner.query(
      `ALTER TABLE "sites" ALTER COLUMN "name" TYPE citext USING "name"::citext`
    )
    await queryRunner.query(
      `ALTER TABLE "technologies" ALTER COLUMN "name" TYPE character varying(50) COLLATE pg_catalog."default"`
    )
    await queryRunner.query(
      `ALTER TABLE "tags" ALTER COLUMN "name" TYPE character varying(50) COLLATE pg_catalog."default"`
    )
  }
}
