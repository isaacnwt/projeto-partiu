import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Evento } from 'src/eventos/evento.schema';
import { PALAVRAS_CHAVE_EVENTOS } from './palavras_chave';

@Injectable()
export class ScraperService {
  private readonly PALAVRAS_CHAVE = PALAVRAS_CHAVE_EVENTOS;

  async getEventosSCAgora(): Promise<Evento[]> {
    const url = 'https://www.saocarlosagora.com.br/entretenimento/';
    const eventos: Evento[] = [];

    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      $('.linkNoticia').each((_, element) => {
        const noticiaDiv = $(element).find('.listaNoticia');
        const linkEl = noticiaDiv.find('a').first();
        const linkHref = linkEl.attr('href') || '';
        const titulo = noticiaDiv.find('h3').text().trim();

        if (!titulo || !linkHref || !this.isEventoRelevante(titulo)) return;

        const descricao = noticiaDiv.find('h5').text().trim();
        eventos.push(this.criarEventoBasico(titulo, linkHref, descricao));
      });

      console.log(`[SCAgora] Total de eventos válidos: ${eventos.length}`);
      return eventos;
    } catch (error) {
      console.error('[SCAgora] Erro ao buscar eventos:', error.message);
      return [];
    }
  }

  async getEventosACidadeON(): Promise<Evento[]> {
    const url = 'https://www.acidadeon.com/saocarlos/lazer-e-cultura/';
    const eventos: Evento[] = [];

    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      $('div.td-module-thumb a[title]').each((_, el) => {
        const titulo = $(el).attr('title')?.trim() || '';
        const link = $(el).attr('href');

        if (!titulo || !link || !this.isEventoRelevante(titulo)) return;

        eventos.push(this.criarEventoBasico(titulo, link));
      });

      console.log(`[ACidadeON] Total de eventos válidos: ${eventos.length}`);
      return eventos;
    } catch (error) {
      console.error('[ACidadeON] Erro ao buscar eventos:', error.message);
      return [];
    }
  }

  async getTodosEventos(): Promise<Evento[]> {
    console.log('Iniciando extração de eventos...');
    const eventosAgora = await this.getEventosSCAgora();
    const eventosACidade = await this.getEventosACidadeON();
    console.log('Extração concluída!');
    return [...eventosAgora, ...eventosACidade];
  }

  private isEventoRelevante(titulo: string): boolean {
    return this.PALAVRAS_CHAVE.some(palavra => titulo.toLowerCase().includes(palavra));
  }

  private criarEventoBasico(titulo: string, link: string, descricao = ''): Evento {
    return {
      titulo,
      descricao,
      data: undefined,
      endereco: 'São Carlos - SP',
      links: [{ label: 'Ver notícia completa', url: link }],
      contatos: [],
      criadoPor: undefined,
      fonteAutomatica: true,
    };
  }
}
