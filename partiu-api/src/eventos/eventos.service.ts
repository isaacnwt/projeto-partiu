import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento, EventoDocument } from './evento.schema';

@Injectable()
export class EventosService {
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<EventoDocument>,
  ) {}

  async criar(criarEventoDto: any): Promise<Evento> {
    const eventoCriado = new this.eventoModel(criarEventoDto);
    return eventoCriado.save();
  }

  async listarTodos(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }
}
