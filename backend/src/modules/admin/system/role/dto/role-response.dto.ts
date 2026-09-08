import { ApiProperty } from '@nestjs/swagger';
import { PermissionResponseDto } from '../../permission/dto/permission-repsonse.dto';

export class RoleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({ type: [PermissionResponseDto] })
  permissions: PermissionResponseDto[];
}
