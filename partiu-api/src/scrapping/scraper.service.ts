import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Evento } from 'src/eventos/evento.schema';
import { PALAVRAS_CHAVE_EVENTOS } from './palavras_chave';

@Injectable()
export class ScraperService {
  PALAVRAS_CHAVE = PALAVRAS_CHAVE_EVENTOS;

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
  
        // Filtrar pelas palavras-chave no título
        if (!this.PALAVRAS_CHAVE.some(palavra => titulo.toLowerCase().includes(palavra))) {
          return;
        }
  
        const descricao = noticiaDiv.find('h5').text().trim();
        const imagem = noticiaDiv.find('img').attr('src') || '';
  
        const evento = {
          titulo,
          descricao,
          data: undefined,
          endereco: 'São Carlos - SP',
          links: [
            {
              label: 'Ver notícia completa',
              url: linkHref,
            },
          ],
          contatos: [],
          criadoPor: undefined,
          fonteAutomatica: true,
        };
  
        eventos.push(evento);
      });
  
      console.log(`Total de eventos válidos: ${eventos.length}`);
      return eventos;
    } catch (error) {
      console.error('Erro ao buscar eventos do São Carlos Agora:', error.message);
      return [];
    }
  }

  async getEventosACidadeON(): Promise<any[]> {
    const url = 'https://www.acidadeon.com/saocarlos/lazer-e-cultura/';
    const eventos: any[] = [];
  
    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);
  
      $('div.td-module-thumb a[title]').each((_, el) => {
        const link = $(el).attr('href');
        const titulo = $(el).attr('title')?.trim() || '';
  
        if (!titulo || !link) return;
  
        if (!this.PALAVRAS_CHAVE.some(palavra => titulo.toLowerCase().includes(palavra))) {
          return;
        }
  
        const evento = {
          titulo,
          descricao: '', 
          data: undefined, 
          endereco: 'São Carlos - SP',
          links: [
            {
              label: 'Ver notícia completa',
              url: link
            }
          ],
          contatos: [],
          criadoPor: undefined,
          fonteAutomatica: true
        };
  
        eventos.push(evento);
      });
  
      console.log(`Total de eventos válidos: ${eventos.length}`);
      return eventos;
    } catch (error) {
      console.error(`Erro ao buscar eventos do ACidadeON: ${error.message}`);
      return [];
    }
  }

  async getTodosEventos(): Promise<any[]> {
    console.log('Iniciando extração de eventos...');
    const eventosAgora = await this.getEventosSCAgora();
    const eventosACidade = await this.getEventosACidadeON();
    console.log('Extração concluída!');
    return [...eventosAgora, ...eventosACidade];
  }
}
