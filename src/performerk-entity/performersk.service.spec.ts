import { Test, TestingModule } from '@nestjs/testing';
import { PerformerskService } from './performersk.service';
import { PerformerEntity } from './performer.entity/performer.entity';
import { Repository } from 'typeorm';
import { typeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PerformerskService', () => {
  let service: PerformerskService;
  let repository: Repository<PerformerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...typeOrmTestingConfig()],
      providers: [PerformerskService],
    }).compile();

    service = module.get<PerformerskService>(PerformerskService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
