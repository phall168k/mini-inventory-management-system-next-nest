import { DataSource } from "typeorm";
import { type Seeder } from "typeorm-extension";
import { PermissionEntity } from "../../modules/admin/system/permission/entities/permission.entity";
import { permissions, type PermissionSeed } from "./permissions.seed";

export default class MainSeeder implements Seeder {
    public async run(database: DataSource): Promise<void> {
        await database.transaction(async (manager) => {
            const repository = manager.getRepository(PermissionEntity);

            const seedPermissions = async (
                entries: PermissionSeed[],
                parentId: number | null,
            ): Promise<void> => {
                for (const entry of entries) {
                    await repository.upsert(
                        { name: entry.name, parentId },
                        ['name'],
                    );
                    const permission = await repository.findOneOrFail({
                        where: { name: entry.name },
                        withDeleted: true,
                    });

                    if (entry.children?.length) {
                        await seedPermissions(entry.children, permission.id);
                    }
                }
            };

            await seedPermissions(permissions, null);
        });
    }
}
