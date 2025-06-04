import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  usuarioLogado = false;
  nomeUsuario = '';
  isAdmin = false;
  isOrganizador = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.atualizarEstadoUsuario();

    // Atualiza o estado do menu sempre que houver mudança de rota
    this.router.events.subscribe(() => {
      this.atualizarEstadoUsuario();
    });
  }

  atualizarEstadoUsuario() {
    const usuario = this.authService.getUsuario();
    this.usuarioLogado = !!usuario;
    this.nomeUsuario = usuario?.nome ?? '';
    this.isAdmin = usuario?.tipo === 'admin';
    this.isOrganizador = usuario?.tipo === 'organizador';
  }

  logout() {
    this.authService.logout();
    this.usuarioLogado = false;
    this.router.navigateByUrl('/splash');
  }
}

