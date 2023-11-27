import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumEntityModule } from './album-entity/album-entity.module';
import { TrackEntityModule } from './track-entity/track-entity.module';
import { PerformerkEntityModule } from './performerk-entity/performerk-entity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album-entity/album.service';
import { TracksService } from './track-entity/tracks.service';
import { PerformerskService } from './performerk-entity/performersk.service';
import { AlbumPerformerModule } from './album-performer/album-performer.module';
import { AlbumController } from './album-entity/album.controller';
import { TrackController } from './track-entity/track.controller';

@Module({
  imports: [AlbumEntityModule, TrackEntityModule, PerformerkEntityModule, AlbumPerformerModule, 
    TypeOrmModule.forRoot(
    {type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'parcial2',
   dropSchema: false,
   synchronize: true,
  keepConnectionAlive: true,}
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
