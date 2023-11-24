import { AlbumEntity } from 'src/almbum-entity/album.entity/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class PerformerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    nombre: String;

    @Column()
    imagen: String;

    @Column()
    descripcion: String;

    @ManyToMany(type => AlbumEntity, albums => albums.performers)
    albums: AlbumEntity[];
}
