import { Component } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { EventoCardComponent } from '../components/evento-card/evento-card.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Evento } from '../models/evento.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, EventoCardComponent]
})
export class HomePage {
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.eventoService.getEventos().subscribe(eventos => {
      this.eventos = eventos;
    });
  }
}
