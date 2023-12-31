import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/bussiness-errors';

@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) {}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ['performer']});
    }

    async findOne(id: string): Promise<AlbumEntity> {

        const album: AlbumEntity = await this.albumRepository.findOne({ where: {id}, relations: ['performer']});
        if (!album) {
            throw new BusinessLogicException(`album con ID ${id} no encontrado`, BusinessError.NOT_FOUND);
        }
        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if(album.nombre.startsWith('') || album.descripcion.startsWith('')){
            throw new BusinessLogicException('El nombre y la descripcion no pueden estar vacios', BusinessError.BAD_REQUEST);
        }
        return await this.albumRepository.save(album);
    }

    async update(id: string, album: AlbumEntity): Promise<AlbumEntity> {

        const albumToUpdate: AlbumEntity = await this.albumRepository.findOne({ where: {id}});
        if (!albumToUpdate) {
            throw new BusinessLogicException(`album con ID ${id} no encontrado`, BusinessError.NOT_FOUND);
        }

        album.id = id;

        return await this.albumRepository.save(album);
    }

    async delete(id: string): Promise<void> {
        const albumToDelete: AlbumEntity = await this.albumRepository.findOne({ where: {id}});
        if (!albumToDelete) {
            throw new BusinessLogicException('Album not found', BusinessError.NOT_FOUND);
        }
        else if(albumToDelete.tracks.length > 0){
            throw new BusinessLogicException('Album has tracks', BusinessError.BAD_REQUEST);
        }
        await this.albumRepository.remove(albumToDelete);
    }

}
