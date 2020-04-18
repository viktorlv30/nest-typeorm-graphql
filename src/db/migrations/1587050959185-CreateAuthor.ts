import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthor1587050959185 implements MigrationInterface {
	private authorTable = new Table({
		name: 'authors',
		columns: [
			{
				name: 'id',
				type: 'INTEGER',
				isPrimary: true,
				isGenerated: true,
				generationStrategy: 'increment',
			},
			{
				name: 'first_name',
				type: 'varchar',
				length: '255',
				isNullable: false,
			},
			{
				name: 'last_name',
				type: 'varchar',
				length: '255',
				isNullable: false,
			},
		],
	});

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.createTable(this.authorTable);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropTable(this.authorTable);
	}
}
