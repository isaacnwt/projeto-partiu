import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScraperService {
  async getEventosSCAgora(): Promise<any[]> {
    const url = 'https://www.saocarlosagora.com.br/cidade/';
    console.log(`🔍 Buscando eventos em: ${url}`);

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const eventos: any[] = [];

      $('.linkNoticia').each((i, el) => {
        const dataEvento = $(el).find('.listaData small').text().trim();
        const link = $(el).find('.listaNoticia a').attr('href');
        const titulo = $(el).find('.listaNoticia a').attr('title')?.trim();

        if (titulo && link) {
          eventos.push({
            titulo,
            data: dataEvento || 'Data não informada',
            link: `https://www.saocarlosagora.com.br${link}`,
            fonte: 'São Carlos Agora',
          });

          console.log(`📌 Evento encontrado: ${titulo} - ${dataEvento}`);
        }
      });

      console.log(`✅ Total de eventos extraídos: ${eventos.length}`);
      return eventos;
    } catch (error) {
      console.error(`❌ Erro ao buscar eventos do São Carlos Agora: ${error.message}`);
      return [];
    }
  }

  async getEventosACidadeON(): Promise<any[]> {
    const url = 'https://www.acidadeon.com/saocarlos/lazer-e-cultura/';
    console.log(`🔍 Buscando eventos em: ${url}`);

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const eventos: any[] = [];

      $('.post-item').each((i, el) => {
        const titulo = $(el).find('.post-title').text().trim();
        const link = $(el).find('a').attr('href');
        const dataEvento = $(el).find('.post-date').text().trim();

        if (titulo && link) {
          eventos.push({
            titulo,
            data: dataEvento || 'Data não informada',
            link,
            fonte: 'A Cidade ON',
          });

          console.log(`📌 Evento encontrado: ${titulo} - ${dataEvento}`);
        }
      });

      console.log(`✅ Total de eventos extraídos: ${eventos.length}`);
      return eventos;
    } catch (error) {
      console.error(`❌ Erro ao buscar eventos do A Cidade ON: ${error.message}`);
      return [];
    }
  }

  async getTodosEventos(): Promise<any[]> {
    console.log('🚀 Iniciando extração de eventos...');
    const eventosAgora = await this.getEventosSCAgora();
    const eventosACidade = await this.getEventosACidadeON();
    const todosEventos = [...eventosAgora, ...eventosACidade];

    console.log('🎯 Extração concluída! Total de eventos:', todosEventos.length);
    return todosEventos;
  }
}
