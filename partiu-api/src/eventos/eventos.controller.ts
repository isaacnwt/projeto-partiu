import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

  @Get('publicos')
  async findAllPublicos() {
    return this.eventosService.findAllPublicos();
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

  @Get('usuario/:id')
  async getEventosPorUsuario(@Param('id') id: string): Promise<Evento[]> {
    return this.eventosService.findByUsuario(id);
  }

  @Get('automaticos')
  async getEventosAutomaticos(): Promise<Evento[]> {
    return this.eventosService.findAutomaticos();
  }

  @Get('automaticos/pendentes')
  async getEventosAutomaticosNaoRevisados() {
    return this.eventosService.findAutomaticosNaoRevisados();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eventosService.delete(id);
  }

}
