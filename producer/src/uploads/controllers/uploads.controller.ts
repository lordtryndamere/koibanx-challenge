import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UPLOADS_SERVICE } from '../constants/constants';

import { UploadsController } from '../interfaces/upload.controller.interface';
import { UploadsService } from '../interfaces/uploads.service.interface';

@Controller('uploads')
export class UploadsControllerImpl implements UploadsController {
  constructor(
    @Inject(UPLOADS_SERVICE)
    private readonly uploadService: UploadsService,
  ) {}
  @Post('/excel')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Body() formatMapper: any): Promise<any> {
    return await this.uploadService.upload(file, formatMapper);
  }
  @Get('/:idTransaction')
  async get(@Param('idTransaction') idTransaction: string): Promise<any> {
    await this.uploadService.getTransaction(idTransaction);
  }
}
