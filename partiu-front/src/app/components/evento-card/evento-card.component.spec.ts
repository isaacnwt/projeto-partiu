import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventoCardComponent } from './evento-card.component';

describe('EventCardComponent', () => {
  let component: EventoCardComponent;
  let fixture: ComponentFixture<EventoCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EventoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
