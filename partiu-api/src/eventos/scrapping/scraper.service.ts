import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Evento, EventoDocument } from 'src/eventos/evento.schema';
import { PALAVRAS_CHAVE_EVENTOS } from './palavras_chave';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScraperService {
  
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<EventoDocument>,
  ) {}

  private readonly PALAVRAS_CHAVE = PALAVRAS_CHAVE_EVENTOS;

  async onModuleInit() {
    console.log('[Scraper] Executando scraping inicial...');
    await this.executeScraping();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async executarPeriodicamente() {
    console.log('[Scraper] Executando scraping agendado...');
    await this.executeScraping();
  }

  private async executeScraping(): Promise<void> {
    console.log('[Scraper] Iniciando scraping geral...');
    await this.getEventosSCAgora();
    await this.getEventosACidadeON();
    await this.getEventosDeSitesExtras();
    console.log('[Scraper] Scraping completo.');
  }

  private async getEventosSCAgora(): Promise<void> {
    const url = 'https://www.saocarlosagora.com.br/entretenimento/';
    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const promises: Promise<void>[] = [];

      $('.linkNoticia').each((_, element) => {
        const noticiaDiv = $(element).find('.listaNoticia');
        const linkEl = noticiaDiv.find('a').first();
        const linkHref = linkEl.attr('href') || '';
        const titulo = noticiaDiv.find('h3').text().trim();

        if (!titulo || !linkHref || !this.isEventoRelevante(titulo)) return;
        if (!this.isTituloValido(titulo)) {
          console.log(`[Scraper] Título ignorado por baixa qualidade: ${titulo}`);
          return;
        }

        const descricao = noticiaDiv.find('h5').text().trim();
        const origemScrapingId = this.generateOrrigemScrapingId(titulo);
        const evento = this.criarEventoBasico(titulo, linkHref, origemScrapingId, descricao);

        promises.push(this.salvarSeNaoExistir(evento));
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('[SCAgora] Erro ao buscar eventos:', error.message);
    }
  }

  private async getEventosACidadeON(): Promise<void> {
    const url = 'https://www.acidadeon.com/saocarlos/lazer-e-cultura/';
    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const promises: Promise<void>[] = [];

      $('div.td-module-thumb a[title]').each((_, el) => {
        const titulo = $(el).attr('title')?.trim() || '';
        const link = $(el).attr('href') || '';

        if (!titulo || !link || !this.isEventoRelevante(titulo)) return;
        if (!this.isTituloValido(titulo)) {
          console.log(`[Scraper] Título ignorado por baixa qualidade: ${titulo}`);
          return;
        }

        const origemScrapingId = this.generateOrrigemScrapingId(titulo);
        const evento = this.criarEventoBasico(titulo, link, origemScrapingId);
        
        promises.push(this.salvarSeNaoExistir(evento));
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('[ACidadeON] Erro ao buscar eventos:', error.message);
    }
  }

  private async getEventosDeSitesExtras(): Promise<void> {
    const urls = [
      'https://sao-carlos.sp.gov.br/eventos',
      'https://agenda.cultura.sp.gov.br/',
      'https://www.sympla.com.br/eventos/sao-carlos-sp',
    ];

    for (const url of urls) {
      await this.scrapGenericPage(url);
    }
  }

  private async scrapGenericPage(url: string): Promise<void> {
  
    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const promises: Promise<void>[] = [];
  
      // Busca geral por links com títulos que podem ser eventos
      $('a').each((_, element) => {
        const texto = $(element).text().trim();
        const href = $(element).attr('href');
  
        if (!texto || !href || !this.isEventoRelevante(texto)) return;
  
        const titulo = texto;
        const link = href.startsWith('http') ? href : `${url}${href}`;
        const origemScrapingId = this.generateOrrigemScrapingId(titulo);
        if (!this.isTituloValido(titulo)) {
          console.log(`[Scraper] Título ignorado por baixa qualidade: ${titulo}`);
          return;
        }
  
        const evento = this.criarEventoBasico(titulo, link, origemScrapingId);
        promises.push(this.salvarSeNaoExistir(evento));
      });
  
      // Busca por títulos e manchetes em outras tags
      $('h1, h2, h3, .title, .headline, .post-title').each((_, element) => {
        const titulo = $(element).text().trim();
        const linkEl = $(element).find('a');
        const href = linkEl.attr('href') || '';
  
        if (!titulo || !href || !this.isEventoRelevante(titulo)) return;
        if (!this.isTituloValido(titulo)) {
          console.log(`[Scraper] Título ignorado por baixa qualidade: ${titulo}`);
          return;
        }
  
        const origemScrapingId = this.generateOrrigemScrapingId(titulo);
  
        const evento = this.criarEventoBasico(titulo, href, origemScrapingId);
        promises.push(this.salvarSeNaoExistir(evento));
      });
  
      await Promise.all(promises);
    } catch (error) {
      console.error(`[GENÉRICO] Falha ao processar ${url}: ${error.message}`);
    }
  }

  private async salvarSeNaoExistir(evento: Evento): Promise<void> {
    if (!evento.origemScrapingId) return;

    const jaExiste = await this.eventoModel.exists({ origemScrapingId: evento.origemScrapingId });
    if (!jaExiste) {
      await this.eventoModel.create(evento);
      console.log(`[Scraper] Evento salvo: ${evento.titulo}`);
    } else {
      console.log(`[Scraper] Evento já existe: ${evento.titulo}`);
    }
  }

  private generateOrrigemScrapingId(texto: string): string {
    return texto.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '')
        .toUpperCase();
  }

  private isEventoRelevante(titulo: string): boolean {
    return this.PALAVRAS_CHAVE.some(palavra => titulo.toLowerCase().includes(palavra));
  }

  private isTituloValido(titulo: string): boolean {
    const texto = titulo.trim().toLowerCase();

    const palavras = texto.split(/\s+/);
    const temPalavrasSuficientes = palavras.length >= 4;
    const tamanhoMinimo = texto.length >= 20;

    const contemVerboComum = /(acontece|começa|confira|recebe|realiza|estreia|agita|oferece|apresenta|lança|inicia|terá|tem|marca|promove)/i.test(texto);

    const temLocalOuData = /(em|no|na|às|das|de)/i.test(texto);

    return temPalavrasSuficientes && tamanhoMinimo && (contemVerboComum || temLocalOuData);
  }


  private criarEventoBasico(titulo: string, link: string, origemScrapingId: string, descricao = ''): Evento {
    return {
      titulo,
      descricao,
      data: new Date(),
      endereco: 'São Carlos - SP',
      links: [{ label: 'Ver notícia completa', url: link }],
      contatos: [],
      criadoPor: undefined,
      fonteAutomatica: true,
      revisado: false,
      origemScrapingId,
    };
  }
}
