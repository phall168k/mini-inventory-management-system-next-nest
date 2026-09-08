import { ApiProperty } from "@nestjs/swagger";

export class PermissionChildrenResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    parentId: number;

    @ApiProperty()
    name: string;
}

export class PermissionResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    parentId: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ type: [PermissionChildrenResponseDto] })
    children: PermissionChildrenResponseDto[];

}