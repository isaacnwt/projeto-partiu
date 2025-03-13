import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'evento/:id',
    loadComponent: () => import('./pages/evento-detalhes/evento-detalhes.page').then((m) => m.EventoDetalhesPage),
  },
  {
    path: 'cadastro-evento',
    loadComponent: () => import('./pages/cadastro-evento/cadastro-evento.page').then((m) => m.CadastroEventoPage),
  },
  {
    path: 'gerenciamento-eventos',
    loadComponent: () => import('./pages/gerenciamento-eventos/gerenciamento-eventos.page').then((m) => m.GerenciamentoEventosPage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then((m) => m.PerfilPage),
  },
];
