export interface PermissionSeed {
    name: string;
    children?: PermissionSeed[];
}

export const permissions: PermissionSeed[] = [
    {
        name: 'Role',
        children: [
            { name: 'role-read' },
            { name: 'role-create' },
            { name: 'role-update' },
            { name: 'role-delete' },
        ],
    },
    {
        name: 'Permission',
        children: [
            { name: 'permission-read' },
            { name: 'permission-create' },
            { name: 'permission-update' },
            { name: 'permission-delete' },
        ],
    },
];
