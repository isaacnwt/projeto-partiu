import { Injectable } from '@angular/core';
import { Evento } from '../models/evento.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = 'http://localhost:3000/eventos';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  getEventosScrapping(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/todos`);
  }

  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  cadastrarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  deletarEvento(id: string): Observable<Evento> {
    throw new Error('Method not implemented.');
  }
}
