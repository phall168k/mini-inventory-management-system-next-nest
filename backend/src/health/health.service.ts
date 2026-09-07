import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './dto/health-response.dto';

@Injectable()
export class HealthService {
    public healthCheck(): HealthResponseDto {
        return {
            status: 'ok',
            uptime: process.uptime(),
        };
    }
}
