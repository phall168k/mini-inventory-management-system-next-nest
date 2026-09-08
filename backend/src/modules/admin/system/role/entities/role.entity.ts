import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../../../database/entities/base.entity";
import { PermissionEntity } from "../../permission/entities/permission.entity";

@Entity({
    schema: 'admin',
    name: 'roles',
})
export class RoleEntity extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: '150',
        unique: true,
        nullable: false,
    })
    name: string;

    @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
        cascade: false,
        lazy: false,
    })
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        },
    })
    permissions: PermissionEntity[];

    constructor(partial?: Partial<RoleEntity>) {
        super();
        Object.assign(this, partial);
    }
}
