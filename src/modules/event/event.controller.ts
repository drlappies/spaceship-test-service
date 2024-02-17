import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventService } from './event.service';

@Controller('/v1/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Sse('/price-updated')
  sendPriceUpdatedEvent(): Observable<MessageEvent> {
    return this.eventService.handlePriceUpdatedEvent();
  }
}
