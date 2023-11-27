import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksDto } from './tracks.dto/tracks.dto';
import { TrackEntity } from './track.entity/track.entity';
import { plainToInstance } from 'class-transformer';

@Controller('album')
export class TrackController {
    constructor(private readonly trackService: TracksService) {}

    @Get(':albumId/tracks')
    async findAll() {
        return await this.trackService.findAll();
    }

    @Get(':albumId/tracks/:trackId')
    async findOne(@Param('trackId') trackId: string) {
        return await this.trackService.findOne(trackId);
    }

    @Post(':albumId/tracks')
    async create(@Param('albumId') albumId: string, @Body() trackDto: TracksDto) {
        const track: TrackEntity = plainToInstance(TrackEntity, TracksDto)
        return await this.trackService.create(albumId, track);
    }
    
}
