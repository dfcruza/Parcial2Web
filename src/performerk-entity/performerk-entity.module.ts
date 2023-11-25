import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerEntity } from './performer.entity/performer.entity';

@Module({
    imports:[TypeOrmModule.forFeature([PerformerEntity])]
})
export class PerformerkEntityModule {}
