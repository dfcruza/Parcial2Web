import { Test, TestingModule } from '@nestjs/testing';
import { PerformerskService } from './performersk.service';

describe('PerformerskService', () => {
  let service: PerformerskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformerskService],
    }).compile();

    service = module.get<PerformerskService>(PerformerskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
