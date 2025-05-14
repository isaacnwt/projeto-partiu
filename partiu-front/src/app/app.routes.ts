import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadComponent: () => import('./pages/splash/splash.page').then((m) => m.SplashPage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage) },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'evento/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/evento-detalhes/evento-detalhes.page').then((m) => m.EventoDetalhesPage),
  },
  {
    path: 'cadastro-evento',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cadastro-evento/cadastro-evento.page').then((m) => m.CadastroEventoPage),
  },
  {
    path: 'gerenciamento-eventos',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/gerenciamento-eventos/gerenciamento-eventos.page').then((m) => m.GerenciamentoEventosPage),
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/perfil/perfil.page').then((m) => m.PerfilPage),
  }
];
