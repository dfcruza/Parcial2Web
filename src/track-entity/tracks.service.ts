import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track-entity/track.entity/track.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/bussiness-errors';
import { AlbumEntity } from 'src/album-entity/album.entity/album.entity';

@Injectable()
export class TracksService {

    constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    private readonly albumRepository: Repository<AlbumEntity>
    ) {}

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

    async create(id: string ,track: TrackEntity): Promise<TrackEntity> {

        const album = await this.albumRepository.findOne({ where: {id}, relations: ['tracks', 'performers']});
        if(!album){
            throw new BusinessLogicException('Album not found', BusinessError.NOT_FOUND);
        }

        if (Number(track.duracion) < 0 || isNaN(Number(track.duracion))) {
            throw new BusinessLogicException('La duracion no puede ser negativa', BusinessError.BAD_REQUEST);
        }

        track.album = album;

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
