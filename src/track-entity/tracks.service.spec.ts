import { Test, TestingModule } from '@nestjs/testing';
import { TracksService } from './tracks.service';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity/track.entity';
import { typeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker, tr } from '@faker-js/faker';

describe('TracksService', () => {
  let service: TracksService;
  let repository: Repository<TrackEntity>;
  let tracksList: TrackEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...typeOrmTestingConfig()],
      providers: [TracksService],
    }).compile();

    service = module.get<TracksService>(TracksService);
    repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tracksList = [];

    for (let i =0; i< 5; i++){
      const track = await repository.save({
        nombre: faker.person.firstName(),
        duracion: faker.datatype.number(),
        album: null
      })
      tracksList.push(track);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tracks', async () => {
    const tracks: TrackEntity[] = await service.findAll();
    expect(tracks).not.toBeNull();
    expect(tracks).toHaveLength(tracksList.length);
  });

  it('findOne should return a track by id', async () => {
    const storedTrack: TrackEntity = tracksList[0];
    const track: TrackEntity = await service.findOne(storedTrack.id.toString());
    expect(track).not.toBeNull();
    expect(track.id).toEqual(storedTrack.id);
    expect(track.nombre).toEqual(storedTrack.nombre);
    expect(track.duracion).toEqual(storedTrack.duracion);
    expect(track.album).toEqual(storedTrack.album);
  });

  it('findOne should throw an exception when track is not found', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "Track not found");
  });

  it('create should return a track', async () => {
    const track: TrackEntity = await service.create({
      id: "",
      nombre: faker.person.firstName(),
      duracion: faker.datatype.number(),
      album: null
    });
    const newTrack: TrackEntity = await service.create(track);
    expect(newTrack).not.toBeNull();

    const storedTrack: TrackEntity = await repository.findOne({ where: { id: newTrack.id } });
    expect(storedTrack).not.toBeNull();
    expect(storedTrack.nombre).toEqual(newTrack.nombre);
    expect(storedTrack.duracion).toEqual(newTrack.duracion);
    expect(storedTrack.album).toEqual(newTrack.album);
  });

  it('create should throw an exception when duration is negative', async () => {
    await expect(() => service.create({
      id: "",
      nombre: faker.person.firstName(),
      duracion: -1,
      album: null
    })).rejects.toHaveProperty("message", "La duracion no puede ser negativa");
  });

  it('update should modify a track', async () => {
    const track: TrackEntity = tracksList[0];
    track.nombre = "new name";
    track.duracion = 100;
    track.album = null;
    const updatedTrack: TrackEntity = await service.update(track.id.toString(), track);
    expect(updatedTrack).not.toBeNull();
    const storedTrack: TrackEntity = await repository.findOne({ where: { id: track.id } });
    expect(storedTrack).not.toBeNull();
    expect(storedTrack.nombre).toEqual(track.nombre);
    expect(storedTrack.duracion).toEqual(track.duracion);
    expect(storedTrack.album).toEqual(track.album);
  });

  it('update should throw an exception when track is not found', async () => {
    let track: TrackEntity = tracksList[0];
    track = {
      ...track, nombre: "new name", duracion: 100, album: null
    }
    await expect(() => service.update("0", track)).rejects.toHaveProperty("message", "Track not found");
  });

  it('delete should remove a track', async () => {
    const track: TrackEntity = tracksList[0];
    await service.delete(track.id.toString());
    const deletedTrack: TrackEntity = await repository.findOne({ where: { id: track.id } });
    expect(deletedTrack).toBeUndefined();
  });

  it('delete should throw an exception for an invalid track', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "Track not found");
  });
});
