import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { EventoService } from 'src/app/services/evento.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.page.html',
  styleUrls: ['./cadastro-evento.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonListHeader,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonTextarea,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CadastroEventoPage {
  eventoForm: FormGroup;
  idEvento?: string;
  modoEdicao = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.eventoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      data: ['', Validators.required],
      endereco: ['', Validators.required],
      links: this.fb.array([]),
      contatos: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.idEvento = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.idEvento) {
      this.modoEdicao = true;
      this.eventoService.getEventoById(this.idEvento).subscribe(evento => {
        this.eventoForm.patchValue({
          titulo: evento.titulo,
          descricao: evento.descricao,
          data: evento.data?.substring(0, 10),
          endereco: evento.endereco,
        });

        evento.links?.forEach(link => {
          this.links.push(this.fb.group({
            label: [link.label, Validators.required],
            url: [link.url, Validators.required],
          }));
        });

        evento.contatos?.forEach(contato => {
          this.contatos.push(this.fb.group({
            nome: [contato.nome, Validators.required],
            telefone: [contato.telefone, Validators.required],
          }));
        });
      });
    }
  }

  get links(): FormArray {
    return this.eventoForm.get('links') as FormArray;
  }

  get contatos(): FormArray {
    return this.eventoForm.get('contatos') as FormArray;
  }

  addLink() {
    this.links.push(
      this.fb.group({
        label: ['', Validators.required],
        url: ['', Validators.required],
      })
    );
  }

  removeLink(index: number) {
    this.links.removeAt(index);
  }

  addContato() {
    this.contatos.push(
      this.fb.group({
        nome: ['', Validators.required],
        telefone: ['', Validators.required],
      })
    );
  }

  removeContato(index: number) {
    this.contatos.removeAt(index);
  }

  cadastrar() {
    if (this.eventoForm.invalid) return;

    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) {
      alert('Usuário não autenticado');
      this.router.navigateByUrl('/splash');
    }

    const evento = {
      ...this.eventoForm.value,
      criadoPor: usuarioId
    };

    if (this.modoEdicao && this.idEvento) {
      const eventoAtualizado = { ...evento, revisado: true };

      this.eventoService.atualizarEvento(this.idEvento, eventoAtualizado).subscribe({
        next: () => {
          alert('Evento atualizado com sucesso!');
          this.router.navigateByUrl('/home');
        },
        error: err => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.eventoService.cadastrarEvento(evento).subscribe({
        next: () => {
          alert('Evento cadastrado com sucesso!');
          this.router.navigateByUrl('/home');
        },
        error: err => console.error('Erro ao cadastrar:', err)
      });
    }
  }

}
