import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaulVal1711168807754 implements MigrationInterface {
    name = 'SetDefaulVal1711168807754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}
