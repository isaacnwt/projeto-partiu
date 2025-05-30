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

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.carregarEventos();
  }

  carregarEventos() {
    this.eventoService.getEventosScrapping().subscribe((eventos) => {
      this.eventos = eventos;
    });
  }

  excluirEvento(id: string) {
    this.eventoService.deletarEvento(id).subscribe(() => {
      this.eventos = this.eventos.filter((evento) => evento._id !== id);
    });
  }
}
