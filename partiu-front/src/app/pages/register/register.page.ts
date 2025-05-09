import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      papel: ['', Validators.required]
    }, { validators: this.senhasIguais });
  }

  senhasIguais(form: FormGroup) {
    const senha = form.get('senha')?.value;
    const confirmar = form.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  criarConta() {
    if (this.registerForm.invalid) return;

    const { nome, email, senha, papel } = this.registerForm.value;

    const usuario: Usuario = {
      nome,
      email,
      senha,
      tipo: papel
    };

    this.usuarioService.save(usuario).subscribe({
      next: () => {
        alert('Conta criada com sucesso!');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error('Erro ao criar conta:', err);
        alert('Erro ao criar conta');
      }
    });
  }

  voltar() {
    this.router.navigateByUrl('/login');
  }
}
