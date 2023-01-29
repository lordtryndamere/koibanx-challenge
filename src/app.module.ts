import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { databaseProviders } from './uploads/providers/database.provider';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXCEL_UPLOADS',
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
    UploadsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
