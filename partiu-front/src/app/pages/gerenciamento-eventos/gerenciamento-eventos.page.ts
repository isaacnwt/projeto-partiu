import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-gerenciamento-eventos',
  templateUrl: './gerenciamento-eventos.page.html',
  styleUrls: ['./gerenciamento-eventos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GerenciamentoEventosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
