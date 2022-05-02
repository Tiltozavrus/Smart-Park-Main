import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("parking")
@Controller('parking')
export class ParkingController {
    @Get()
    @ApiBearerAuth()
    test() {
        return ""
    }
}
