import { Controller } from '@nestjs/common';
import { UploadsController } from '../interfaces/upload.controller.interface';

@Controller('uploads')
export class UploadsControllerImpl implements UploadsController {
  upload(): void {
    throw new Error('Method not implemented.');
  }
}
