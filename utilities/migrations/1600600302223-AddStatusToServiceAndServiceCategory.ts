import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusToServiceAndServiceCategory1600600302223 implements MigrationInterface {
    name = 'AddStatusToServiceAndServiceCategory1600600302223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_category" ADD "status" text NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "service" ADD "status" text NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "service_category" DROP COLUMN "status"`);
    }

}
