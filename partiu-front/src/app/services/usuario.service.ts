import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://192.168.0.20:3000/usuarios';

  constructor(private http: HttpClient) {}

  save(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}`, usuario);
  }

}
