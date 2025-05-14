import { Component } from '@angular/core';
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
export class AppComponent {
  usuarioLogado = false;
  nomeUsuario = '';

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(() => {
      const usuario = this.authService.getUsuario();
      this.usuarioLogado = !!usuario;
      this.nomeUsuario = usuario?.nome ?? '';
    });
  }

  logout() {
    this.authService.logout();
    this.usuarioLogado = false;
    this.router.navigateByUrl('/splash');
  }
}
