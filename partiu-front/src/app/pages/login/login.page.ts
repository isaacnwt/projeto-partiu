import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class LoginPage {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.senha).subscribe({
      next: (usuario) => {
        this.authService.setUsuario(usuario);
        this.router.navigateByUrl('/home');
      },
      error: () => alert('Credenciais inválidas'),
    });
  }

  irParaCadastro() {
    this.router.navigateByUrl('/register');
  }

  disable(): boolean {
    return this.email.trim() == '' || this.senha.trim() == '';
  }
}
