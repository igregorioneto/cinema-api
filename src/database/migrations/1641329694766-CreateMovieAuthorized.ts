import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMovieAuthorized1641329694766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: 'movie-authorized',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                    },
                    {
                        name: 'authorized',
                        type: 'boolean',
                    },
                    {
                        name: 'employee_id',
                        type: 'uuid',
                        isPrimary: false,
                        generationStrategy: 'uuid'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movie-authorized');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
