import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track-entity/track.entity/track.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/bussiness-errors';

@Injectable()
export class TracksService {

    constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>) {}

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find({ relations: ['album']});
    }

    async findOne(id: string): Promise<TrackEntity> {

        const track: TrackEntity = await this.trackRepository.findOne({ where: {id}, relations: ['album']});
        if (!track) {
            throw new BusinessLogicException('Track not found', BusinessError.NOT_FOUND);
        }
        return track;
    }

    async create(track: TrackEntity): Promise<TrackEntity> {
        if(track.duracion < 0){
            throw new BusinessLogicException('La duracion no puede ser negativa', BusinessError.BAD_REQUEST);
        }
        return await this.trackRepository.save(track);
    }

    async update(id: string, track: TrackEntity): Promise<TrackEntity> {
        const trackToUpdate: TrackEntity = await this.trackRepository.findOne({ where: {id}});
        if (!trackToUpdate) {
            throw new BusinessLogicException('Track not found', BusinessError.NOT_FOUND);
        }

        track.id = id;

        return await this.trackRepository.save(track);
    }

    async delete(id: string): Promise<void> {
        const trackToDelete: TrackEntity = await this.trackRepository.findOne({ where: {id}});
        if (!trackToDelete) {
            throw new BusinessLogicException('Track not found', BusinessError.NOT_FOUND);
        }
        await this.trackRepository.remove(trackToDelete);
    }
}
