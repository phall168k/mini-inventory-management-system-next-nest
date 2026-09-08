export interface RoleSeed {
    name: string;
    permissions: string[];
}

export const roles: RoleSeed[] = [
    {
        name: 'Admin',
        permissions: [
            'role-read',
            'role-create',
            'role-update',
            'role-delete',
            'permission-read',
            'permission-create',
            'permission-update',
            'permission-delete',
        ],
    },
    {
        name: 'Cashier',
        permissions: [
            'role-read',
            'role-create',
            'role-update',
            'role-delete',
        ]
    }
];
