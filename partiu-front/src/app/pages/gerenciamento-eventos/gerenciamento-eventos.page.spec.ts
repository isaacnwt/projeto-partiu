import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenciamentoEventosPage } from './gerenciamento-eventos.page';

describe('GerenciamentoEventosPage', () => {
  let component: GerenciamentoEventosPage;
  let fixture: ComponentFixture<GerenciamentoEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciamentoEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
