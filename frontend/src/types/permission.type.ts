interface IPermissionChildren {
    id: number;
    parentId: number | null;
    name: string;
}

export interface IPermission {
    id: number;
    parentId: number | null;
    name: string;
    children: IPermissionChildren[];
}