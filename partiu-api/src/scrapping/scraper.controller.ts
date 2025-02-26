import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('eventos')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('saocarlosagora')
  async getEventosSCAgora() {
    return this.scraperService.getEventosSCAgora();
  }

  @Get('acidadeon')
  async getEventosACidadeON() {
    return this.scraperService.getEventosACidadeON();
  }

  @Get('todos')
  async getTodosEventos() {
    return this.scraperService.getTodosEventos();
  }
}
