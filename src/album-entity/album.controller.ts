import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto/album.dto';
import { AlbumEntity } from './album.entity/album.entity';
import { plainToInstance } from 'class-transformer';

@Controller('albums')
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService
    ) {}

    @Get()
    async findAll() {
        return await this.albumService.findAll();
    }

    @Get(':albumId')
    async findOne(@Param('albumId') albumId: string) {
        return await this.albumService.findOne(albumId);
    }

    @Post()
    async create(@Body() albumDto: AlbumDto) {
        const album: AlbumEntity = plainToInstance(AlbumEntity, AlbumDto)
        return await this.albumService.create(album);
    }

    @Delete(':albumId')
    @HttpCode(204)
    async delete(@Param('albumId') albumId: string) {
        return await this.albumService.delete(albumId);
    }
}
