import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlert1696264590244 implements MigrationInterface {
    name = 'AddAlert1696264590244';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "alert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roomId" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "alert"`);
    }
}
