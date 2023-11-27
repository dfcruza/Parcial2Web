import { AlbumEntity } from 'src/album-entity/album.entity/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class TrackEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: String;

    @Column()
    duracion: Number;

    @ManyToOne(() => AlbumEntity, album => album.tracks)
    album: AlbumEntity;
}
