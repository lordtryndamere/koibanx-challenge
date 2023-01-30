import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import {
  EXCEL_UPLOADS_AMQ,
  IntegrationEventSubject,
  INVALID_FORMAT,
  INVALID_FORMAT_CODE,
  States,
  UPLOADS_REPOSITORY,
} from '../constants/constants';
import {
  FILE_XLSX_IS_REQUIRED,
  INVALID_ENDWITH_FORMAT,
  INVALID_FORMAT_MAPPER,
} from '../constants/response.constants';
import { ErrorResponseDTO } from '../dtos/error-response.dto';
import { IntegrationEventPublisher } from '../interfaces/integration-event-publisher';
import { UploadsService } from '../interfaces/uploads.service.interface';
import * as Excel from 'exceljs';
import { UploadsRepository } from '../interfaces/uploads.repository.interface';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import * as _ from 'lodash';

@Injectable()
export class UploadsServiceImpl implements UploadsService {
  constructor(
    @Inject(EXCEL_UPLOADS_AMQ)
    private readonly publisheramq: IntegrationEventPublisher,
    @Inject(UPLOADS_REPOSITORY)
    private readonly repository: UploadsRepository,
  ) {}

  async proccessExcelFile(fileBuffer: Buffer, format: any): Promise<any[]> {
    try {
      const formatMapper = JSON.parse(format.formatMapper);
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(fileBuffer);
      const workSheet = workbook.getWorksheet(1);
      const count = workSheet.getRow(1).actualCellCount;
      if (count !== Object.keys(formatMapper).length)
        throw INVALID_FORMAT_MAPPER;
      const formatHeaders: any = Object.values(formatMapper);

      const data = [];

      for (let index = 2; index <= workSheet.rowCount; index++) {
        const row = workSheet.getRow(index);
        const obj = {};

        for (let j = 1; j <= row.cellCount; j++) {
          obj[formatHeaders[j - 1].name] =
            typeof row.getCell(j).value !=
            formatHeaders[j - 1].type.toLowerCase()
              ? {
                  error: JSON.stringify({
                    column: formatHeaders[j - 1].name,
                    cellName: row.getCell(j).value,
                    index: j,
                  }),
                }
              : row.getCell(j).value;
        }
        data.push(obj);
      }

      return data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw INVALID_FORMAT_MAPPER;
      } else {
        throw error;
      }
    }
  }
  async publishAMQData(data: Array<any>, idTransaction: string) {
    await this.publisheramq.publish({
      subject: IntegrationEventSubject.EXCEL_UPLOAD,
      data: {
        idTransaction,
        data: JSON.stringify({ data }),
      },
    });
  }
  async upload(file: any, format: any): Promise<any> {
    try {
      if (!file) throw FILE_XLSX_IS_REQUIRED;
      if (!file.originalname.endsWith('.xlsx')) {
        throw INVALID_ENDWITH_FORMAT;
      }

      const newTransaction: CreateTransactionDto = {
        type: 'upload',
        state: States.PENDING,
      };
      const idTransaction = await this.repository.save(newTransaction);
      const data = await this.proccessExcelFile(file.buffer, format);
      await this.publishAMQData(data, idTransaction);
      return idTransaction;
    } catch (error) {
      throw new HttpException(
        new ErrorResponseDTO(
          INVALID_FORMAT_CODE,
          error.message ? error.message : INVALID_FORMAT,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
