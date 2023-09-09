import { Test, TestingModule } from '@nestjs/testing';
import { MoviesDbService } from './movies-db.service';

describe('MoviesDbService', () => {
  let service: MoviesDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesDbService],
    }).compile();

    service = module.get<MoviesDbService>(MoviesDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
