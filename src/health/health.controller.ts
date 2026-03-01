import { Controller, Get, HttpCode, Logger } from '@nestjs/common';



@Controller('api/health')
export class HealthController {
    private readonly logger = new Logger("HealthController");

    @Get()
    @HttpCode(200)
    check() {
    this.logger.log('POST /health -- status: up')    
    return { status: 'up' };
    }

}
