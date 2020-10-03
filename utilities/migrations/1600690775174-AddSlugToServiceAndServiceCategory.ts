import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlugToServiceAndServiceCategory1600690775174 implements MigrationInterface {
    name = 'AddSlugToServiceAndServiceCategory1600690775174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_category" ADD "slug" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service_category" ADD CONSTRAINT "UQ_de7c6bf768165f5d172f1fed699" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "service" ADD "slug" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "UQ_4df47ef659e04d5be78ddb6b598" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "UQ_4df47ef659e04d5be78ddb6b598"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "service_category" DROP CONSTRAINT "UQ_de7c6bf768165f5d172f1fed699"`);
        await queryRunner.query(`ALTER TABLE "service_category" DROP COLUMN "slug"`);
    }

}
