export class UsuarioResponseDto {
  _id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'organizador' | 'convidado';
  telefone?: string;
}
