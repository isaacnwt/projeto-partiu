import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScraperService {
  async getEventosSCAgora(): Promise<any[]> {
    const url = 'https://www.saocarlosagora.com.br/cidade/';
    console.log(`Fetching data from: ${url}`);

    try {
      const { data } = await axios.get(url);
      console.log('Página carregada com sucesso!');
      const $ = cheerio.load(data);
      const eventos: any[] = [];

      $('.noticia').each((i, el) => {
        const titulo = $(el).find('h2').text().trim();
        const link = $(el).find('a').attr('href');
        const data = $(el).find('.data').text().trim();
        
        console.log(`Evento encontrado: ${titulo} - ${data} - ${link}`);

        if (titulo && link) {
          eventos.push({ titulo, data, link: `https://www.saocarlosagora.com.br${link}` });
        }
      });

      console.log(`Total de eventos extraídos: ${eventos.length}`);
      return eventos;
    } catch (error) {
      console.error(`Erro ao buscar eventos: ${error.message}`);
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
