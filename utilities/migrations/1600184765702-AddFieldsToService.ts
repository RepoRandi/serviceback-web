import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsToService1600184765702 implements MigrationInterface {
  name = 'AddFieldsToService1600184765702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "imageUrl" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "price" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "cashbackPercent" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "durationMinutes" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "serviceCategoryId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_7a1a6e2ccf2b42863d8142d306a" FOREIGN KEY ("serviceCategoryId") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_7a1a6e2ccf2b42863d8142d306a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP COLUMN "serviceCategoryId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP COLUMN "durationMinutes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP COLUMN "cashbackPercent"`,
    );
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "imageUrl"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "description"`);
  }
}
