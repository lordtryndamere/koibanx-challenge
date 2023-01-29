import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EXCEL_UPLOADS_AMQ } from '../constants/constants';
import {
  IntegrationEvent,
  IntegrationEventPublisher,
} from '../interfaces/integration-event-publisher';

@Injectable()
export class AMQEventPublisherImplement implements IntegrationEventPublisher {
  constructor(@Inject(EXCEL_UPLOADS_AMQ) private readonly client: ClientProxy) {
    this.connect();
  }

  async publish(message: IntegrationEvent): Promise<void> {
    Logger.debug('emiting event ', message.subject);
    this.client.emit(message.subject, message.data).subscribe();
  }

  private connect(): any {
    this.client.connect();
  }
}
