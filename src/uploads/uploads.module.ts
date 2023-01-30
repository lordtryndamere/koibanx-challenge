import { Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CLIENT_PROXY_EXCEL_UPLOAD,
  EXCEL_UPLOADS_AMQ,
  UPLOADS_REPOSITORY,
  UPLOADS_SERVICE,
} from './constants/constants';
import { UploadsControllerImpl } from './controllers/uploads.controller';
import { databaseProviders } from './providers/database.provider';
import { transactionsProviders } from './providers/transaction.provider';
import { UploadsRepositoryImpl } from './repository/uploads.repository';
import { AMQEventPublisherImplement } from './services/amq-event-publisher';
import { UploadsServiceImpl } from './services/uploads.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ...transactionsProviders,
  ],
  imports: [
    ClientsModule.register([
      {
        name: CLIENT_PROXY_EXCEL_UPLOAD,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/'],
          queue: 'excel-queue',
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ConfigModule,
  ],
};

@Module(uploadsModuleOptions)
export class UploadsModule {}
