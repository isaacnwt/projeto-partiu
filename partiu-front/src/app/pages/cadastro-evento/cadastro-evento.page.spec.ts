import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroEventoPage } from './cadastro-evento.page';

describe('CadastroEventoPage', () => {
  let component: CadastroEventoPage;
  let fixture: ComponentFixture<CadastroEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
