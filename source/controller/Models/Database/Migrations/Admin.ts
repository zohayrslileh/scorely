import { MigrationInterface, QueryRunner } from "typeorm"

export class PostRefactoringTIMESTAMP implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {

        console.log(queryRunner)
    }

    async down(queryRunner: QueryRunner): Promise<void> {

        console.log(queryRunner)
    }
}