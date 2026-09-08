import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleRequestDto } from './dto/create-role-request.dto';
import { UpdateRoleRequestDto } from './dto/update-role-request.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleResponseDto } from './dto/role-response.dto';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { SWAGGER_TOKEN_NAME } from '../../../../swagger/config';
import { ApiPaginatedResponse } from '../../../../libs/common/paginations/api-paginated-response.decorator';
import { PaginatedResponse } from '../../../../libs/common/paginations/paginated-response.type';
import { RoleEntity } from './entities/role.entity';
import { RoleSelectOptionResponseDto } from './dto/role-select-option-response.dto';
@ApiTags('Role')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/system/roles',
  version: '1',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a role' })
  @ApiResponse({ status: 201, type: RoleResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    return this.roleService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all roles' })
  @ApiPaginatedResponse(RoleResponseDto)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<PaginatedResponse<RoleEntity, RoleResponseDto>> {
    return this.roleService.list(query);
  }

  @Get('select-options')
  @ApiOperation({ summary: 'Role select options' })
  @ApiResponse({ status: 200, type: [RoleSelectOptionResponseDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public findAllForSelection(): Promise<RoleSelectOptionResponseDto[]> {
    return this.roleService.findAllForSelection();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a role by id' })
  @ApiOkResponse({ type: RoleResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleResponseDto> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a role by id' })
  @ApiOkResponse({ type: RoleResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    return this.roleService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a role by id' })
  @ApiResponse({ status: 200 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.roleService.remove(id);
  }
}
