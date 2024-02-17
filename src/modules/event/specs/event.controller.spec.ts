import { Test } from '@nestjs/testing';
import { EventController } from '../event.controller';
import { EventService } from '../event.service';

describe('EventController', () => {
  let eventService: EventService;
  let eventController: EventController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EventController,
        {
          provide: EventService,
          useValue: {
            subscribePriceUpdatedEvent: jest.fn(),
          },
        },
      ],
    }).compile();

    eventController = moduleRef.get<EventController>(EventController);
    eventService = moduleRef.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(eventController).toBeDefined();
    expect(eventService).toBeDefined();
  });

  describe('sendPriceUpdatedEvent', () => {
    it('should subcribe to price updated event', async () => {
      eventController.subscribePriceUpdatedEvent();
      expect(eventService.subscribePriceUpdatedEvent).toHaveBeenCalled();
    });
  });
});
