import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
import { UploadsRepository } from '../interfaces/uploads.repository.interface';

@Injectable()
export class AMQEventPublisherImplement implements IntegrationEventPublisher {
  constructor(
    @Inject(CLIENT_PROXY_EXCEL_UPLOAD) private readonly client: ClientProxy,
    @Inject(UPLOADS_REPOSITORY)
    private readonly repository: UploadsRepository,
  ) {
    this.connect();
  }

  async publish(message: IntegrationEvent): Promise<void> {
    Logger.debug('emiting event ', message.subject);
    this.client
      .send(message.subject, message.data)
      .subscribe(async (response: ResponseEventDto) => {
        if (response.code === 200) {
          await this.repository.update(response.idTransaction, States.DONE);
        }
      });
  }

  private connect(): any {
    this.client.connect();
  }
}
