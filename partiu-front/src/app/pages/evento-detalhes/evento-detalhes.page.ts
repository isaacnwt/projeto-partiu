import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.page.html',
  styleUrls: ['./evento-detalhes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EventoDetalhesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
