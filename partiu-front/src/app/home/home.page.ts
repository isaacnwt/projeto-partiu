import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventCardComponent } from '../components/event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, EventCardComponent]
})
export class HomePage {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }
}
