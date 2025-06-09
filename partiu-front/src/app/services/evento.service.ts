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

  getEventosPublicos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/publicos`);
  }

  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  getEventosPorUsuario(usuarioId: string): Observable<Evento[]> {
  return this.http.get<Evento[]>(`${this.apiUrl}/usuario/${usuarioId}`);
}

  getEventosAutomaticos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/automaticos/pendentes`);
  }

  cadastrarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  deletarEvento(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  atualizarEvento(id: string, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }

}
