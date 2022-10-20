import { MigrationInterface, QueryRunner } from "typeorm";

export class taskUserUuidNullable1666280889486 implements MigrationInterface {
    name = 'taskUserUuidNullable1666280889486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "userUuid" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "userUuid" SET NOT NULL`);
    }

}
