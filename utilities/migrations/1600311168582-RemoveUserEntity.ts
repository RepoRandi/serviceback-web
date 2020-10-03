import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserEntity1600311168582 implements MigrationInterface {
  name = 'RemoveUserEntity1600311168582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_address" DROP CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2"`,
    );
    await queryRunner.query(`ALTER TABLE "user_address" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_7a1a6e2ccf2b42863d8142d306a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ALTER COLUMN "serviceCategoryId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_7a1a6e2ccf2b42863d8142d306a" FOREIGN KEY ("serviceCategoryId") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "user" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "type" text NOT NULL DEFAULT 'CUSTOMER', "status" text NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_7a1a6e2ccf2b42863d8142d306a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ALTER COLUMN "serviceCategoryId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_7a1a6e2ccf2b42863d8142d306a" FOREIGN KEY ("serviceCategoryId") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
