import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento, EventoSchema } from './evento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }]),
  ],
  providers: [EventosService],
  controllers: [EventosController],
})
export class EventosModule {}
