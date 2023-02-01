import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CLIENT_PROXY_EXCEL_UPLOAD,
  States,
  UPLOADS_REPOSITORY,
} from '../constants/constants';
import { ResponseEventDto } from '../dtos/response-event.dto';
import {
  IntegrationEvent,
  IntegrationEventPublisher,
} from '../interfaces/integration-event-publisher';

@Injectable()
export class AMQEventPublisherImplement implements IntegrationEventPublisher {
  constructor(
    @Inject(CLIENT_PROXY_EXCEL_UPLOAD) private readonly client: ClientProxy,
  ) {
    this.connect();
  }

  async publish(message: IntegrationEvent): Promise<Observable<any>> {
    Logger.debug('emiting event ', message.subject);
    return this.client.send(message.subject, message.data);
  }

  private connect(): any {
    this.client.connect();
  }
}
