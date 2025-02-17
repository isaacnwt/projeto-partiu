import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento, EventoDocument } from './evento.schema';
import { CreateEventoDto } from './dto/create-evento.dto/create-evento.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<EventoDocument>,
  ) {}

  async create(criarEventoDto: CreateEventoDto): Promise<Evento> {
    const eventoCriado = new this.eventoModel(criarEventoDto);
    return eventoCriado.save();
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }
}
