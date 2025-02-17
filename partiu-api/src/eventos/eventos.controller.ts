import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {
    constructor(private readonly eventosService: EventosService) {}

    @Post()
    async criar(@Body() criarEventoDto: any) {
        return this.eventosService.criar(criarEventoDto);
    }

    @Get()
    async listarTodos() {
        return this.eventosService.listarTodos();
    }
}
