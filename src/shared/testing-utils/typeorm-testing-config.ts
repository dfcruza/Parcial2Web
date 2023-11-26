import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumEntity } from "src/album-entity/album.entity/album.entity";
import { PerformerEntity } from "src/performerk-entity/performer.entity/performer.entity"; 
import { TrackEntity } from "src/track-entity/track.entity/track.entity";

export const typeOrmTestingConfig= () => [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [AlbumEntity, PerformerEntity, TrackEntity],
    synchronize: true,
    dropSchema: true,
    keepConnectionAlive: true
}), 
TypeOrmModule.forFeature([AlbumEntity, PerformerEntity, TrackEntity])
];