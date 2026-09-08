import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = 'admin.roles_permissions';
const roleTable = 'admin.roles';
const permissionTable = 'admin.permissions';

export class RolePermissionMigration17887719425391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'role_id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'permission_id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['role_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: roleTable,
                        onUpdate: 'CASCADE',
                    },
                    {
                        columnNames: ['permission_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: permissionTable,
                        onUpdate: 'CASCADE',
                    }
                ]
            }),
            true,
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(tableName, true, true);
    }
}