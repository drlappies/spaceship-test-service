import { Module, Logger } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [EventController],
  providers: [Logger, EventService],
})
export class EventModule {}
