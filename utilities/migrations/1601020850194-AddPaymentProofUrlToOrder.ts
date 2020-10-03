import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentProofUrlToOrder1601020850194
  implements MigrationInterface {
  name = 'AddPaymentProofUrlToOrder1601020850194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "paymentProofImageUrl" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP COLUMN "paymentProofImageUrl"`,
    );
  }
}
