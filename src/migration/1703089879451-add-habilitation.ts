import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHabilitation1703089879451 implements MigrationInterface {
    name = 'AddHabilitation1703089879451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "habilitation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, CONSTRAINT "UQ_40949a5f4ed48b22c078fed168f" UNIQUE ("userId"), CONSTRAINT "PK_0144ef043363c178afd2cc759c0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "habilitation"`);
    }

}
