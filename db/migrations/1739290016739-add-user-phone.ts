import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1739290016739 implements MigrationInterface {
    name = 'AddUserPhone1739290016739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
