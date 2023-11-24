import { AlbumEntity } from 'src/album-entity/album.entity/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class TrackEntity {

    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    nombre: String;

    @Column()
    duracion: Number;

    @ManyToOne(type => AlbumEntity, album => album.tracks)
    album: AlbumEntity;
}
