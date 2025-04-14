import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Evento } from 'src/eventos/evento.schema';

@Injectable()
export class ScraperService {
  async getEventosSCAgora(): Promise<Evento[]> {
    const url = 'https://www.saocarlosagora.com.br/entretenimento/';
    const eventos: Evento[] = [];
  
    const PALAVRAS_CHAVE = [
      'show', 'evento', 'musical', 'festa', 'teatro', 'festival',
      'cinema', 'curso', 'feira', 'semana de', 'workshop', 'exposição',
      'palestra', 'encontro', 'lançamento', 'competição', 'conferência',
      'congresso', 'live', 'atividades', 'comemoração'
    ];
  
    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);
  
      $('.linkNoticia').each((_, element) => {
        const noticiaDiv = $(element).find('.listaNoticia');
        const linkEl = noticiaDiv.find('a').first();
        const linkHref = linkEl.attr('href') || '';
        const titulo = noticiaDiv.find('h3').text().trim();
  
        // Filtrar pelas palavras-chave no título
        if (!PALAVRAS_CHAVE.some(palavra => titulo.toLowerCase().includes(palavra))) {
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
    console.log(`Fetching data from: ${url}`);

    try {
      const { data } = await axios.get(url);
      console.log('Página carregada com sucesso!');
      const $ = cheerio.load(data);
      const eventos: any[] = [];

      $('.noticia-item').each((i, el) => {
        const titulo = $(el).find('h3').text().trim();
        const link = $(el).find('a').attr('href');
        const data = $(el).find('.data').text().trim();

        console.log(`Evento encontrado: ${titulo} - ${data} - ${link}`);

        if (titulo && link) {
          eventos.push({ titulo, data, link });
        }
      });

      console.log(`Total de eventos extraídos: ${eventos.length}`);
      return eventos;
    } catch (error) {
      console.error(`Erro ao buscar eventos: ${error.message}`);
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
