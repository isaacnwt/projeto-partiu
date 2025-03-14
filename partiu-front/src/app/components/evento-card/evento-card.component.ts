import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Evento } from '../../models/evento.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './evento-card.component.html',
  styleUrls: ['./evento-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class EventoCardComponent  implements OnInit {

  @Input() evento!: Evento;

  constructor(private router: Router) { }

  ngOnInit() {}

  abrirDetalhes(id: string) {
    console.log(this.evento);
    this.router.navigate(['/evento', id]);
  }

}
