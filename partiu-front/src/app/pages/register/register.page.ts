import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, IonButton],
})
export class RegisterPage {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  papel = ''; // organizador ou convidado

  constructor(private router: Router) {}

  criarConta() {
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // TODO: Enviar dados para API e tratar resposta
    console.log({
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      papel: this.papel,
    });

    alert('Conta criada com sucesso!');
    this.router.navigateByUrl('/login');
  }
}
