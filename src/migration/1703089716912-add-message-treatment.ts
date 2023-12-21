import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessageTreatment1703089716912 implements MigrationInterface {
    name = 'AddMessageTreatment1703089716912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."message_treatment_kind_enum" AS ENUM('irrelevant', 'error', 'unauthorized', 'pending', 'handled')`);
        await queryRunner.query(`CREATE TABLE "message_treatment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "messageExternalId" character varying NOT NULL, "kind" "public"."message_treatment_kind_enum" NOT NULL, CONSTRAINT "UQ_d46844b3cc22921adf042af3687" UNIQUE ("messageExternalId"), CONSTRAINT "PK_a419557444ad3276c51843030fa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "message_treatment"`);
        await queryRunner.query(`DROP TYPE "public"."message_treatment_kind_enum"`);
    }

}
