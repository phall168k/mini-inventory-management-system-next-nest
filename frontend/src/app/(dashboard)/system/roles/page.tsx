import { getPermssionSelectOptions } from "@/services/permission.service";
import { getRoleSelectOptions } from "@/services/role.service"
import { Button } from "antd";

export default async function RolePage() {
    const roleSelectOptions = await getRoleSelectOptions();
    const permissions = await getPermssionSelectOptions();
    return (
        <div>
            Hello Role 
            <Button type="primary">Hello</Button>
            { permissions.map((item) => (
                <div key={item.id}>
                    { item.name }
                    <div>{ item.children.map((child) => (
                        <div key={child.id}>{ child.name }</div>
                    )) }</div>
                </div>
            ))}
        </div>
    )
}
