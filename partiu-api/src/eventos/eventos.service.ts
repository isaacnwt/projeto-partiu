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

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const { data, ...rest } = createEventoDto;
    const formattedDate = this.formatToDate(data);
    
    const createdEvento = new this.eventoModel({ ...rest, data: formattedDate });
    return createdEvento.save();
  }

  
  async findAll(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }

  private formatToDate(data: string) {
    const [dia, mes, ano] = data.split('/').map(Number);
    const formattedDate = new Date(ano, mes - 1, dia);
    return formattedDate;
  }
  
}
