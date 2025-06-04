import { Component } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { EventoCardComponent } from '../../components/evento-card/evento-card.component';
import { CommonModule } from '@angular/common';
import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Evento } from '../../models/evento.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, CommonModule, EventoCardComponent]
})
export class HomePage {
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService, private router: Router) {}

  ngOnInit() {
    this.eventoService.getEventosPublicos().subscribe((eventos) => {
      this.eventos = eventos;
    });
  }
}
