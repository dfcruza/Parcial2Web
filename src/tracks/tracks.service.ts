import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { read } from 'fs';
import { TrackEntity } from 'src/track-entity/track.entity/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {

    constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>) {}

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find();
    }

    async findOne(id: string): Promise<TrackEntity> {

        const track = await this.trackRepository.findOne({where: {id}, relations: ['album']});
        if (!track) {
            return null;
        }
        return track;
    }

    async create(track: TrackEntity): Promise<TrackEntity> {
        return await this.trackRepository.save(track);
    }

    update(id: string, track: TrackEntity): Promise<TrackEntity> {
        track.id = id;
        return this.trackRepository.save(track);
    }
}
