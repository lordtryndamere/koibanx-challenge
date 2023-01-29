import { Controller, Inject } from '@nestjs/common';
import { EXCEL_UPLOADS_AMQ } from '../constants/constants';
import { IntegrationEventPublisher } from '../interfaces/integration-event-publisher';
import { UploadsController } from '../interfaces/upload.controller.interface';

@Controller('uploads')
export class UploadsControllerImpl implements UploadsController {
  constructor(
    @Inject(EXCEL_UPLOADS_AMQ)
    private readonly publisheramq: IntegrationEventPublisher,
  ) {}
  upload(): void {
    throw new Error('Method not implemented.');
  }
}
