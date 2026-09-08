import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { IsNull, Repository } from 'typeorm';
import { handleError } from '../../../../libs/utils/handle-error.util';
import { PermissionMapper } from './permission.mapper';
import { PermissionResponseDto } from './dto/permission-repsonse.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>,
    ) {}

    public async selectOptions(): Promise<PermissionResponseDto[]> {
        try {
            const entities = await this.permissionRepository.find({
                where: {
                    parentId: IsNull(),
                    deletedAt: IsNull(),
                },
                relations: {
                    children: true,
                },
            });
            
            return await Promise.all(
                entities.map((item) => PermissionMapper.toDto(item)),
            );
        } catch (error) {
            handleError(error);
        }
    }
}
