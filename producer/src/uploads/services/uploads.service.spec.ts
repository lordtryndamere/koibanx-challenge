import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from '../interfaces/uploads.service.interface';
import { UploadsServiceImpl } from './uploads.service';

describe('UploadsService', () => {
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadsServiceImpl],
    }).compile();

    service = module.get<UploadsService>(UploadsServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
