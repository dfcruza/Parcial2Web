import { Test, TestingModule } from '@nestjs/testing';
import { PerformerskService } from './performersk.service';
import { PerformerEntity } from './performer.entity/performer.entity';
import { Repository } from 'typeorm';
import { typeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import {faker} from '@faker-js/faker';

describe('PerformerskService', () => {
  let service: PerformerskService;
  let repository: Repository<PerformerEntity>;
  let performersList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...typeOrmTestingConfig()],
      providers: [PerformerskService],
    }).compile();

    service = module.get<PerformerskService>(PerformerskService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    performersList = [];

    for (let i =0; i< 5; i++){
      const performer = await repository.save({
        nombre: faker.person.firstName(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.imageUrl(),
        albums: []
      })
      performersList.push(performer);
    }
  };

  it('should return all performers', async () => {
    const performers: PerformerEntity[] = await service.findAll();
    expect(performers).not.toBeNull();
    expect(performers).toHaveLength(performersList.length);
  });

  it('findOne should return a performer by id', async () => {
    const storedPerformer: PerformerEntity = performersList[0];
    const performer: PerformerEntity = await service.findOne(storedPerformer.id.toString());
    expect(performer).not.toBeNull();
    expect(performer.id).toEqual(storedPerformer.id);
    expect(performer.nombre).toEqual(storedPerformer.nombre);
    expect(performer.descripcion).toEqual(storedPerformer.descripcion);
    expect(performer.imagen).toEqual(storedPerformer.imagen);
    expect(performer.albums).toEqual(storedPerformer.albums);
  });

  it('findOne should throw an exception for an invalid performer', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "Performer not found");
  });

  it('create should return a new performer', async () => {
    const performer: PerformerEntity = {
      id: "",
      nombre: faker.person.firstName(),
      descripcion: faker.lorem.paragraph(),
      imagen: faker.image.imageUrl(),
      albums: []
    }
    const newPerformer: PerformerEntity = await service.create(performer);
    expect(newPerformer).not.toBeNull();

    const storedPerformer: PerformerEntity = await repository.findOne({where: {id: newPerformer.id}});
    expect(storedPerformer).not.toBeNull();
    expect(storedPerformer.nombre).toEqual(performer.nombre);
    expect(storedPerformer.descripcion).toEqual(performer.descripcion);
    await expect(() => service.create(performer)).rejects.toHaveProperty("message", "La descripcion del performer no puede estar vacia");
    expect(storedPerformer.imagen).toEqual(performer.imagen);
    expect(storedPerformer.albums).toEqual(performer.albums);
  });

  it('update should modify a performer', async () => {
    const performer: PerformerEntity = performersList[0];
    performer.nombre = "New name";
    performer.descripcion = "New description";
    const updatedPerformer: PerformerEntity = await service.update(performer.id.toString(), performer);
    expect(updatedPerformer).not.toBeNull();
    const storedPerformer: PerformerEntity = await repository.findOne({where: {id: updatedPerformer.id}});
    expect(storedPerformer).not.toBeNull();
    expect(storedPerformer.nombre).toEqual(performer.nombre);
    expect(storedPerformer.descripcion).toEqual(performer.descripcion);
  });
});
