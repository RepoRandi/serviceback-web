import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIconUrlToServiceCategory1601098598063
  implements MigrationInterface {
  name = 'AddIconUrlToServiceCategory1601098598063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_category" ADD "iconUrl" text NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "service_category" ALTER COLUMN "iconUrl" SET DEFAULT 'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FAircon.svg?alt=media&token=c8687aea-84f1-40fa-9849-ecd0cee255d6'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_category" DROP COLUMN "iconUrl"`,
    );
  }
}
