import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciamento-eventos',
  templateUrl: './gerenciamento-eventos.page.html',
  styleUrls: ['./gerenciamento-eventos.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonList,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class GerenciamentoEventosPage implements OnInit {
  eventos: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarEventos();
  }

  carregarEventos() {
    const usuario = this.authService.getUsuario();
    if (!usuario) return;

    if (usuario.tipo === 'admin') {
      this.eventoService.getEventosAutomaticos().subscribe((eventos) => {
        this.eventos = eventos;
      });
    } else if (usuario.tipo === 'organizador') {
      this.eventoService.getEventosPorUsuario(usuario._id).subscribe((eventos) => {
        this.eventos = eventos;
      });
    }
  }

  editarEvento(id: string) {
    this.router.navigateByUrl(`/editar-evento/${id}`);
  }

  excluirEvento(id: string) {
    this.eventoService.deletarEvento(id).subscribe(() => {
      this.eventos = this.eventos.filter((evento) => evento._id !== id);
    });
  }
}

