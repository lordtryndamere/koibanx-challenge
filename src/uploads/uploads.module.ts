import { Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UPLOADS_REPOSITORY, UPLOADS_SERVICE } from './constants/constants';
import { UploadsControllerImpl } from './controllers/uploads.controller';
import { UploadsRepositoryImpl } from './repository/uploads.repository';
import { UploadsServiceImpl } from './services/uploads.service';

export const uploadsModuleOptions: ModuleMetadata = {
  controllers: [UploadsControllerImpl],
  providers: [
    { provide: UPLOADS_SERVICE, useClass: UploadsServiceImpl },
    {
      provide: UPLOADS_REPOSITORY,
      useClass: UploadsRepositoryImpl,
    },
  ],
  imports: [ConfigModule],
};

@Module(uploadsModuleOptions)
export class UploadsModule {}
