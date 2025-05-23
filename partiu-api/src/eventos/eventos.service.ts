import { Injectable, NotFoundException } from '@nestjs/common';
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
    const createdEvento = new this.eventoModel(createEventoDto);
    return createdEvento.save();
  }
  
  async findAll(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }

  async findById(id: string): Promise<Evento> {
    try {
      const evento = await this.eventoModel.findById(id).exec();
      if (!evento) {
        throw new NotFoundException(`Evento com ID ${id} não encontrado`);
      }
      return evento;
    } catch (error) {
      throw new NotFoundException(`Erro ao buscar evento com ID ${id}`);
    }
  }

  async update(id: string, updateEventoDto: Partial<CreateEventoDto>): Promise<Evento> {
    const eventoAtualizado = await this.eventoModel.findByIdAndUpdate(
      id,
      updateEventoDto,
      { new: true, runValidators: true }
    ).exec();

    if (!eventoAtualizado) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }

    return eventoAtualizado;
  }

  
}
