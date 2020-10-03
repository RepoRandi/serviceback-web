import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameUserTypeToUserRole1600149123560 implements MigrationInterface {
    name = 'RenameUserTypeToUserRole1600149123560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "type" TO "role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role" TO "type"`);
    }

}
