import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { EVENTS_MOCK } from './mock/events.mock';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: Event[] = EVENTS_MOCK;

  constructor() {}

  getEvents(): Event[] {
    return this.events;
  }
}
