import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioLogado: any = null;

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }

  setUsuario(usuario: any) {
    this.usuarioLogado = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario() {
    if (!this.usuarioLogado) {
      const local = localStorage.getItem('usuario');
      this.usuarioLogado = local ? JSON.parse(local) : null;
    }
    return this.usuarioLogado;
  }

  getUsuarioId(): string | null {
    return this.getUsuario()?._id ?? null;
  }

  logout() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuario');
  }
}
