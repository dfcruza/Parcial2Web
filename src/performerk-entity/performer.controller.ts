import { Controller, UseInterceptors } from '@nestjs/common';
import { PerformerskService } from './performersk.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('performer')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {
    constructor(private readonly performerService: PerformerskService) {}
}
