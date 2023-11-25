import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity/album.entity';

@Module({
    imports:[TypeOrmModule.forFeature([AlbumEntity])]
})
export class AlbumEntityModule {}
