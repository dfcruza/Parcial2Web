import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album-entity/album.entity/album.entity';
import { PerformerEntity } from 'src/performerk-entity/performer.entity/performer.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/bussiness-errors';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumPerformerService {

    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ) {}

    async addPerformerToAlbum(idAlbum: string, idPerformer: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id: idAlbum}, relations: ['performers']});
        const performer: PerformerEntity =  await this.performerRepository.findOne({where:{id: idPerformer}});
        if(!album){
            throw new BusinessLogicException(`Album con el ID ${idAlbum} no encontrado`, BusinessError.NOT_FOUND);
        }

        if(!performer){
            throw new BusinessLogicException(`Performer con el ID ${idPerformer} no encontrado`, BusinessError.NOT_FOUND);
        }

        album.performers.push(performer);

        return await this.albumRepository.save(album);
    }

    async findPerformerByAlbumIdPerformerId(idAlbum: string, idPerformer: string): Promise<PerformerEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id: idAlbum}, relations: ['performers']});

        if(!album){
            throw new BusinessLogicException(`Album con el ID ${idAlbum} no encontrado`, BusinessError.NOT_FOUND);
        }

        const performer: PerformerEntity =  await this.performerRepository.findOne({where:{id: idPerformer}});
        if(!performer){
            throw new BusinessLogicException(`Performer con el ID ${idPerformer} no encontrado`, BusinessError.NOT_FOUND);
        }

        const albumPerformer: PerformerEntity = album.performers.find(performer => performer.id === idPerformer);

        if(!albumPerformer){
            throw new BusinessLogicException(`Performer con el ID ${idPerformer} no encontrado en el album con el ID ${idAlbum}`, BusinessError.NOT_FOUND);
        }

        return albumPerformer;
    }
}
