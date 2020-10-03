import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveDatetimeToOrder1601000562335 implements MigrationInterface {
  name = 'MoveDatetimeToOrder1601000562335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "datetime"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "datetime" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "datetime"`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "datetime" TIMESTAMP NOT NULL`,
    );
  }
}
