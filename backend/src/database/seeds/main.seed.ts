import { DataSource, In } from "typeorm";
import { type Seeder } from "typeorm-extension";
import { PermissionEntity } from "../../modules/admin/system/permission/entities/permission.entity";
import { permissions, type PermissionSeed } from "./permissions.seed";
import { RoleEntity } from "../../modules/admin/system/role/entities/role.entity";
import { roles } from "./roles.seed";

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

            const roleRepository = manager.getRepository(RoleEntity);

            for (const entry of roles) {
                const permissionNames = [...new Set(entry.permissions)];
                const rolePermissions = permissionNames.length > 0
                    ? await repository.findBy({ name: In(permissionNames) })
                    : [];
                const foundNames = new Set(rolePermissions.map((permission) => permission.name));
                const missingNames = permissionNames.filter((name) => !foundNames.has(name));

                if (missingNames.length > 0) {
                    throw new Error(
                        `Cannot seed role "${entry.name}": missing active permissions ${missingNames.join(', ')}`,
                    );
                }

                await roleRepository.upsert({ name: entry.name }, ['name']);
                const role = await roleRepository.findOneOrFail({
                    where: { name: entry.name },
                    withDeleted: true,
                });
                role.permissions = rolePermissions;
                await roleRepository.save(role);
            }
        });
    }
}
