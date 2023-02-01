import { Observable } from 'rxjs';

export class IntegrationEvent {
  readonly subject: string;
  readonly data: Record<string, string>;
}
export interface IntegrationEventPublisher {
  publish: (event: IntegrationEvent) => Promise<Observable<any>>;
}
