import { Injectable } from '@nestjs/common';
import { UploadsService } from '../interfaces/uploads.service.interface';

@Injectable()
export class UploadsServiceImpl implements UploadsService {
  upload(): void {
    throw new Error('Method not implemented.');
  }
}
