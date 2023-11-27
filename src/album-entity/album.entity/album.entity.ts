import { PerformerEntity } from 'src/performerk-entity/performer.entity/performer.entity';

import { TrackEntity } from 'src/track-entity/track.entity/track.entity';


import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: String;

    @Column()
    fecha_lanzamiento: Date;

    @Column()
    caratula: String;

    @Column()
    descripcion: String;

    @ManyToMany(() => PerformerEntity, performers => performers.albums)
    @JoinTable()
    performers: PerformerEntity[];

    @OneToMany(() => TrackEntity, track => track.album)
    tracks: TrackEntity[];
}

