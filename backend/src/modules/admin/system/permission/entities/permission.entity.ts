import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../../../database/entities/base.entity";

@Entity({
    schema: 'admin',
    name: 'permissions',
})
export class PermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @Column({
        name: 'parent_id',
        type: 'integer',
        default: null,
        nullable: true,
    })
    parentId: number | null;

    @ManyToOne(() => PermissionEntity, (permission) => permission.children, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({
        name: 'parent_id',
    })
    parent: PermissionEntity | null;

    @OneToMany(() => PermissionEntity, (permission) => permission.parent)
    children: PermissionEntity[];

    @Column({
        name: 'name',
        type: 'varchar',
        length: '160',
        unique: true,
        nullable: false,
    })
    name: string;

    constructor(partial?: Partial<PermissionEntity>) {
        super();
        Object.assign(this, partial);
    }
}
