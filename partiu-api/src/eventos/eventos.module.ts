import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento, EventoSchema } from './evento.schema';
import { ScraperService } from './scrapping/scraper.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }]),
  ],
  providers: [EventosService, ScraperService],
  controllers: [EventosController],
})
export class EventosModule {}
