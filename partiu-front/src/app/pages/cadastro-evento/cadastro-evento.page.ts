import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.page.html',
  styleUrls: ['./cadastro-evento.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonListHeader,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonTextarea,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CadastroEventoPage {
  eventoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      data: ['', Validators.required],
      endereco: ['', Validators.required],
      links: this.fb.array([]),
      contatos: this.fb.array([]),
    });
  }

  get links(): FormArray {
    return this.eventoForm.get('links') as FormArray;
  }

  get contatos(): FormArray {
    return this.eventoForm.get('contatos') as FormArray;
  }

  addLink() {
    this.links.push(
      this.fb.group({
        label: ['', Validators.required],
        url: ['', Validators.required],
      })
    );
  }

  removeLink(index: number) {
    this.links.removeAt(index);
  }

  addContato() {
    this.contatos.push(
      this.fb.group({
        nome: ['', Validators.required],
        telefone: ['', Validators.required],
      })
    );
  }

  removeContato(index: number) {
    this.contatos.removeAt(index);
  }

  cadastrar() {
    if (this.eventoForm.valid) {
      const evento = this.eventoForm.value;
      console.log('Evento Cadastrado:', evento);
      // Aqui você pode chamar a API para enviar o evento
    }
  }
}