import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserToUserAddress1600830700440 implements MigrationInterface {
    name = 'AddUserToUserAddress1600830700440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_address" ADD "userId" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_address" DROP COLUMN "userId"`);
    }

}
