import { Test, TestingModule } from '@nestjs/testing';
import { UploadsController } from '../interfaces/upload.controller.interface';
import { UploadsControllerImpl } from './uploads.controller';

describe('UploadsController', () => {
  let controller: UploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsControllerImpl],
    }).compile();

    controller = module.get<UploadsController>(UploadsControllerImpl);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
