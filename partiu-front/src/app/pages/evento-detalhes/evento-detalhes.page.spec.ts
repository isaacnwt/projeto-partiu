import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoDetalhesPage } from './evento-detalhes.page';

describe('EventoDetalhesPage', () => {
  let component: EventoDetalhesPage;
  let fixture: ComponentFixture<EventoDetalhesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
