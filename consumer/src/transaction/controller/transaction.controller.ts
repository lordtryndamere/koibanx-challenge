import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { IntegrationEventSubject } from '../constants/constants';
import { IntegrationEvent } from '../events-dto/integration-event.dto';
import { TransactionService } from '../service/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}
  @EventPattern(IntegrationEventSubject.EXCEL_UPLOAD)
  async handleTransaction(transaction: IntegrationEvent) {
    await this.transactionService.handleTransaction(transaction);
  }
}
