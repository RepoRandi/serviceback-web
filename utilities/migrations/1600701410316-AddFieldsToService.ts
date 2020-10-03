import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldsToService1600701410316 implements MigrationInterface {
    name = 'AddFieldsToService1600701410316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" ADD "additionalDetails" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD "quantityUnit" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "quantityUnit"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "additionalDetails"`);
    }

}
