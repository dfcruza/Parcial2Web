import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity/track.entity';

@Module({
    imports:[TypeOrmModule.forFeature([TrackEntity])]
})
export class TrackEntityModule {}
