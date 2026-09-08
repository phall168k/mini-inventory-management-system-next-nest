import { PermissionResponseDto } from "./dto/permission-repsonse.dto";
import { PermissionEntity } from "./entities/permission.entity";

export class PermissionMapper {
    public static async toDto(entity: PermissionEntity): Promise<PermissionResponseDto> {
        const dto = new PermissionResponseDto();

        dto.id = entity.id;
        dto.parentId = entity.parentId;
        dto.name = entity.name;

        if (entity.children && entity.children.length > 0) {
            dto.children = await Promise.all(
                entity.children.map((item) => this.toDto(item)),
            );
        }
        
        return dto;
    }

}
