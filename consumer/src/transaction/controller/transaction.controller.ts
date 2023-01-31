import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IntegrationEventSubject } from '../constants/constants';
import { IntegrationEvent } from '../events-dto/integration-event.dto';
import { ResponseEventDto } from '../events-dto/response-event.dto';
import { TransactionService } from '../service/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}
  @MessagePattern(IntegrationEventSubject.EXCEL_UPLOAD)
  async handleTransaction(
    transaction: IntegrationEvent,
  ): Promise<ResponseEventDto> {
    return await this.transactionService.handleTransaction(transaction);
  }
}
