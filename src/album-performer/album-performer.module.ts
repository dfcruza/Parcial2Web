import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album-entity/album.entity/album.entity';
import { AlbumPerformerService } from './album-performer.service';
import { PerformerEntity } from 'src/performerk-entity/performer.entity/performer.entity';


@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity, PerformerEntity])],
  providers: [AlbumPerformerService],
})
export class AlbumPerformerModule {}
