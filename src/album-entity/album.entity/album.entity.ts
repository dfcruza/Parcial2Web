import { PerformerEntity } from '../performer-entity/performer.entity/performer.entity';

import { TrackEntity } from '../track-entity/track.entity/track.entity';


import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    nombre: String;

    @Column()
    fecha_lanzamiento: Date;

    @Column()
    caratula: String;

    @Column()
    descripcion: String;

    @ManyToMany(type => PerformerEntity, performers => performers.albums)
    @JoinTable()
    performers: PerformerEntity[];

    @OneToMany(type => TrackEntity, track => track.album)
    tracks: TrackEntity[];
}

