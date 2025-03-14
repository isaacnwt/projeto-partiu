import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AppComponent {
  usuarioLogado = false; // Controla se o usuário está autenticado

  constructor(private router: Router) {
    // Monitora mudanças de rota para verificar login
    this.router.events.subscribe(() => {
      this.usuarioLogado = this.router.url !== '/login' && this.router.url !== '/splash';
    });
  }
}
