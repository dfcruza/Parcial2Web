import { AlbumEntity } from 'src/album-entity/album.entity/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class PerformerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: String;

    @Column()
    imagen: String;

    @Column()
    descripcion: String;

    @ManyToMany(() => AlbumEntity, albums => albums.performers)
    albums: AlbumEntity[];
}
