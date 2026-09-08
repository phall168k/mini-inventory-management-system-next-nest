import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { PermissionResponseDto } from './dto/permission-repsonse.dto';

@ApiTags('Permission')
@Controller({
    path: 'admin/system/permissions',
    version: '1',
})
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get('select-options')
    @ApiOperation({ summary: 'Permission select options' })
    @ApiOkResponse({ type: PermissionResponseDto, isArray: true })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async selectOptions(): Promise<PermissionResponseDto[]> {
        return this.permissionService.selectOptions();
    }

}
