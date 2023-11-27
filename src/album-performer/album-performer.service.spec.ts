import { Test, TestingModule } from '@nestjs/testing';
import { AlbumPerformerService } from './album-performer.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from 'src/album-entity/album.entity/album.entity';
import { PerformerEntity } from 'src/performerk-entity/performer.entity/performer.entity';
import { typeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumPerformerService', () => {
  let service: AlbumPerformerService;
  let albumRepository: Repository<AlbumEntity>;
  let performerRepository: Repository<PerformerEntity>;
  let albumEntity: AlbumEntity;
  let performerEntity: PerformerEntity;
  let performersList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...typeOrmTestingConfig()],
      providers: [AlbumPerformerService],
    }).compile();

    service = module.get<AlbumPerformerService>(AlbumPerformerService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDataBase();
  });

  const seedDataBase = async () => { 
    albumRepository.clear();
    performerRepository.clear();
    performersList = [];

    albumEntity = await albumRepository.save({
      nombre: faker.company.name(),
      fecha_lanzamiento: faker.date.past(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
      duracion: faker.number.int(50),
      performers: performersList,
      tracks: []
    });

    for (let i = 0; i < 5; i++) {
      const performer: PerformerEntity = await performerRepository.save({
        nombre: faker.name.firstName(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.imageUrl(),
        albums: [],})
      performersList.push(performer);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a performer to an album', async () => {
    const newPerformer: PerformerEntity = await performerRepository.save({
      nombre: faker.name.firstName(),
      descripcion: faker.lorem.paragraph(),
      imagen: faker.image.imageUrl(),
      albums: []
    });

    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: faker.company.name(),
      fecha_lanzamiento: faker.date.past(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
      duracion: faker.number.int(50),
      tracks: []
    });
    const result: AlbumEntity = await service.addPerformerToAlbum(newPerformer.id, newAlbum.id);
    expect(result).not.toBeNull();
    expect(result.performers.length).toBe(1);
    expect(result.performers[0].id).toBe(newPerformer.id);
    expect(result.performers[0].nombre).toBe(newPerformer.nombre);
    expect(result.performers[0].descripcion).toBe(newPerformer.descripcion);
    expect(result.performers[0].imagen).toBe(newPerformer.imagen);

  });

  it('should throw an error when album does not exist', async () => {
    const newPerformer: PerformerEntity = performersList[0];
    await expect(service.addPerformerToAlbum(newPerformer.id, "999")).rejects.toHaveProperty('message', 'Album con el ID 999 no encontrado');
  });

  it('should throw an error when performer does not exist', async () => {
    const newAlbum: AlbumEntity = albumEntity;
    await expect(service.addPerformerToAlbum("999", newAlbum.id)).rejects.toHaveProperty('message', 'Performer con el ID 999 no encontrado');
  });
});
