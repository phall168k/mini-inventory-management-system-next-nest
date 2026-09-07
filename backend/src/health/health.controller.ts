import { Controller } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthResponseDto } from './dto/health-response.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller({
    path: 'health',
})
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @ApiOperation({ summary: 'Healthy check' })
    @ApiOkResponse({ type: HealthResponseDto })
    public healthCheck(): HealthResponseDto {
        return this.healthService.healthCheck();
    }
}
