import { hashSync } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialCommit1666285874929 implements MigrationInterface {
  name = 'initialCommit1666285874929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("taskUuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "completed" boolean NOT NULL DEFAULT false, "userUuid" uuid, CONSTRAINT "PK_c8662388c796c12b22189cd8cee" PRIMARY KEY ("taskUuid"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("userUuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_4309f0e033d9da5c1f3fd07b7d7" PRIMARY KEY ("userUuid"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users_tasks_tasks" ("usersUserUuid" uuid NOT NULL, "tasksTaskUuid" uuid NOT NULL, CONSTRAINT "PK_b2bce45dbb72d02e7c78973195d" PRIMARY KEY ("usersUserUuid", "tasksTaskUuid"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a9c84651fec98dfd4d7de8290e" ON "users_tasks_tasks" ("usersUserUuid") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d532dbfaa94c7f7865514723c" ON "users_tasks_tasks" ("tasksTaskUuid") `
    );
    await queryRunner.query(
      `ALTER TABLE "users_tasks_tasks" ADD CONSTRAINT "FK_a9c84651fec98dfd4d7de8290eb" FOREIGN KEY ("usersUserUuid") REFERENCES "users"("userUuid") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tasks_tasks" ADD CONSTRAINT "FK_1d532dbfaa94c7f7865514723c7" FOREIGN KEY ("tasksTaskUuid") REFERENCES "tasks"("taskUuid") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `
              INSERT INTO "users" ("name", "email", "password", "isAdmin")
              VALUES ('${process.env.ADMIN_NAME}', '${
        process.env.ADMIN_EMAIL
      }', '${hashSync(process.env.ADMIN_PASSWORD, 10)}', true)
              `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_tasks_tasks" DROP CONSTRAINT "FK_1d532dbfaa94c7f7865514723c7"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tasks_tasks" DROP CONSTRAINT "FK_a9c84651fec98dfd4d7de8290eb"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d532dbfaa94c7f7865514723c"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a9c84651fec98dfd4d7de8290e"`
    );
    await queryRunner.query(`DROP TABLE "users_tasks_tasks"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
