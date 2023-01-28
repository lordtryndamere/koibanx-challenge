import { Injectable } from '@nestjs/common';
import { UploadsRepository } from '../interfaces/uploads.repository.interface';

@Injectable()
export class UploadsRepositoryImpl implements UploadsRepository {
  upload(): void {
    throw new Error('Method not implemented.');
  }
}
