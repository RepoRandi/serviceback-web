import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsToUserAndOrderTables1600943512151
  implements MigrationInterface {
  name = 'AddFieldsToUserAndOrderTables1600943512151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_item" ("datetime" TIMESTAMP NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" uuid NOT NULL, "serviceId" uuid NOT NULL, CONSTRAINT "PK_08bd63b43dbc387046c6ea4edbe" PRIMARY KEY ("orderId", "serviceId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" text NOT NULL, "userEmail" text NOT NULL, "address1" text NOT NULL, "address2" text NOT NULL, "postalCode" text NOT NULL, "totalPrice" double precision NOT NULL, "status" text NOT NULL DEFAULT 'REQUESTED', "paymentStatus" text NOT NULL DEFAULT 'AWAITING_PAYMENT', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" DROP COLUMN "postalCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD "postalCode" text NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_646bf9ece6f45dbe41c203e06e" ON "order_item" ("orderId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d37b18105a007605b7c5a49a55" ON "order_item" ("serviceId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_d37b18105a007605b7c5a49a55a" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_d37b18105a007605b7c5a49a55a"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_d37b18105a007605b7c5a49a55"`);
    await queryRunner.query(`DROP INDEX "IDX_646bf9ece6f45dbe41c203e06e"`);
    await queryRunner.query(
      `ALTER TABLE "user_address" DROP COLUMN "postalCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD "postalCode" integer NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "order_item"`);
  }
}
