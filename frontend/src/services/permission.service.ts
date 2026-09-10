import { IPermission } from "@/types/permission.type";
import { apiFetch } from "./api";

export async function getPermssionSelectOptions() {
    const response = await apiFetch<{ payload: IPermission[], timestamp: number }>(
        "v1/admin/system/permissions/select-options",
    );
    return response.payload;
}