import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './evento-card.component.html',
  styleUrls: ['./evento-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class EventoCardComponent  implements OnInit {

  @Input() evento!: Evento;

  constructor() { }

  ngOnInit() {}

}
