import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.page.html',
  styleUrls: ['./cadastro-evento.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CadastroEventoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
