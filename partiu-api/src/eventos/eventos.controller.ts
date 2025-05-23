import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto/create-evento.dto';
import { Evento } from './evento.schema';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @Get()
  async findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  async getEventoById(@Param('id') id: string): Promise<Evento> {
    return this.eventosService.findById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateEventoDto: Partial<CreateEventoDto>) {
    return this.eventosService.update(id, updateEventoDto);
  }

}
