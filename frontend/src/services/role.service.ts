import { IRoleSelectOption } from "@/types/role.type";
import { apiFetch } from "./api";

export async function getRoleSelectOptions() {
    const response = await apiFetch<{ payload: IRoleSelectOption[]; timestamp: number }>(
        "v1/admin/system/roles/select-options",
    );
    return response.payload;
}
