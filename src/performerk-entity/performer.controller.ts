import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { PerformerskService } from './performersk.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PerformerEntity } from './performer.entity/performer.entity';
import { plainToInstance } from 'class-transformer';
import { PerformersDto } from './performers.dto/performers.dto';

@Controller('performer')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {
    constructor(private readonly performerService: PerformerskService) {}

    @Get()
    async findAll() {
        return await this.performerService.findAll();
    }

    @Get(':performerId')
    async findOne(@Param('performerId') performerId: string) {
        return await this.performerService.findOne(performerId);
    }

    @Post()
    async create() {
        const performer: PerformerEntity = plainToInstance(PerformerEntity, PerformersDto)
        return await this.performerService.create(performer);
    }
}
