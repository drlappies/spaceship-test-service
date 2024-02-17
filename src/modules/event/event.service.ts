import { Injectable, Logger } from '@nestjs/common';
import { Observable, fromEvent, map } from 'rxjs';
import { PriceEvent } from '../price/price.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventService {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  subscribePriceUpdatedEvent(): Observable<MessageEvent> {
    this.logger.log('handlePriceUpdatedEvent');

    return fromEvent(this.eventEmitter, PriceEvent.PRICE_UPDATED).pipe(
      map((price) => {
        return { data: price } as MessageEvent;
      }),
    );
  }
}
