import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/shared/bussiness-errors';
import { faker } from '@faker-js/faker'
import { typeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...typeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumList = [];

    for (let i = 0; i < 10; i++) {
      const album = repository.create({
        nombre: faker.name.firstName(),
        fecha_lanzamiento: faker.date.past(),
        caratula: faker.image.imageUrl(),
        descripcion: faker.lorem.paragraph(),
        performers: [],
        tracks: []
      });
      albumList.push(album);
    }

  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all albums', async () => {
    const albums = await service.findAll();
    expect(albums).not.toBeNull();
    expect(albums).toHaveLength(albumList.length);
  });

  it('should return an album by id', async () => {
    const storedAlbum: AlbumEntity = albumList[0];
    const album: AlbumEntity = await service.findOne(storedAlbum.id.toString());
    expect(album).not.toBeNull();
    expect(album.id).toEqual(storedAlbum.id);
    expect(album.nombre).toEqual(storedAlbum.nombre);
    expect(album.fecha_lanzamiento).toEqual(storedAlbum.fecha_lanzamiento);
    expect(album.caratula).toEqual(storedAlbum.caratula);
    expect(album.descripcion).toEqual(storedAlbum.descripcion);
  });

  it('should throw an error when album not found', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty("message", "Album con el ID 0 no encontrado");
  });

  it('should create an album', async () => {
    const newAlbum: AlbumEntity = repository.create({
      id:"",
      nombre: faker.name.firstName(),
      fecha_lanzamiento: faker.date.past(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
      performers: [],
      tracks: []
    });
    expect(newAlbum).not.toBeNull();
    const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}});
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.id).toEqual(newAlbum.id);
    expect(storedAlbum.nombre).toEqual(newAlbum.nombre);
    expect(storedAlbum.fecha_lanzamiento).toEqual(newAlbum.fecha_lanzamiento);
    expect(storedAlbum.caratula).toEqual(newAlbum.caratula);
    expect(storedAlbum.descripcion).toEqual(newAlbum.descripcion);
  });

  it('should throw an error when album name or description is empty', async () => {
    const newAlbum: AlbumEntity = repository.create({
      id:"",
      nombre: "",
      fecha_lanzamiento: faker.date.past(),
      caratula: faker.image.imageUrl(),
      descripcion: "",
      performers: [],
      tracks: []
    });
    await expect(() => service.create(newAlbum)).rejects.toHaveProperty("message", "El nombre y la descripcion no pueden estar vacios");
  });

  it('should update an album', async () => {
    const storedAlbum: AlbumEntity = albumList[0];
    const newAlbum: AlbumEntity = repository.create({
      id:"",
      nombre: faker.name.firstName(),
      fecha_lanzamiento: faker.date.past(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
      performers: [],
      tracks: []
    });
    const updatedAlbum: AlbumEntity = await service.update(storedAlbum.id.toString(), newAlbum);
    expect(updatedAlbum).not.toBeNull();
    expect(updatedAlbum.id).toEqual(storedAlbum.id);
    expect(updatedAlbum.nombre).toEqual(newAlbum.nombre);
    expect(updatedAlbum.fecha_lanzamiento).toEqual(newAlbum.fecha_lanzamiento);
    expect(updatedAlbum.caratula).toEqual(newAlbum.caratula);
    expect(updatedAlbum.descripcion).toEqual(newAlbum.descripcion);
  });

  it('should throw an error when album not found on update', async () => {
    const newAlbum: AlbumEntity = repository.create({
      id:"",
      nombre: faker.name.firstName(),
      fecha_lanzamiento: faker.date.past(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
      performers: [],
      tracks: []
    });
    await expect(() => service.update('0', newAlbum)).rejects.toHaveProperty("message", "Album con ID 0 no encontrado");
  });

  it('should delete an album', async () => {
    const storedAlbum: AlbumEntity = albumList[0];
    await service.delete(storedAlbum.id.toString());
    const deletedAlbum: AlbumEntity = await repository.findOne({where: {id: storedAlbum.id}});
    expect(deletedAlbum).toBeNull();
  });
});
