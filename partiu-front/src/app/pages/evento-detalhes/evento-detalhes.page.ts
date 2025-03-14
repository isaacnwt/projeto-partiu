import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { Evento } from 'src/app/models/evento.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.page.html',
  styleUrls: ['./evento-detalhes.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EventoDetalhesPage implements OnInit {
  evento!: Evento;

  constructor(private route: ActivatedRoute, private eventoService: EventoService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventoService.getEventoById(id).subscribe((evento) => {
        this.evento = evento;
      });
    }
  }

}
