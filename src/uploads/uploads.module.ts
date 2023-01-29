import { Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  EXCEL_UPLOADS_AMQ,
  UPLOADS_REPOSITORY,
  UPLOADS_SERVICE,
} from './constants/constants';
import { UploadsControllerImpl } from './controllers/uploads.controller';
import { databaseProviders } from './providers/database.provider';
import { UploadsRepositoryImpl } from './repository/uploads.repository';
import { AMQEventPublisherImplement } from './services/amq-event-publisher';
import { UploadsServiceImpl } from './services/uploads.service';

export const uploadsModuleOptions: ModuleMetadata = {
  controllers: [UploadsControllerImpl],
  providers: [
    { provide: UPLOADS_SERVICE, useClass: UploadsServiceImpl },
    { provide: EXCEL_UPLOADS_AMQ, useClass: AMQEventPublisherImplement },
    {
      provide: UPLOADS_REPOSITORY,
      useClass: UploadsRepositoryImpl,
    },
    ...databaseProviders,
  ],
  imports: [ConfigModule],
};

@Module(uploadsModuleOptions)
export class UploadsModule {}
