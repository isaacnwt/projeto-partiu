import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from 'src/usuarios/usuario.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UsuarioResponseDto } from 'src/usuarios/dto/usuario-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>
  ) {}

  async login(email: string, senhaInput: string): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioModel.findOne({ email });
  
    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
  
    const senhaCorreta = await bcrypt.compare(senhaInput, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Senha incorreta');
    }
  
    const { _id, nome, email: userEmail, tipo, telefone } = usuario;
  
    return {
      _id: _id as string,
      nome,
      email: userEmail,
      tipo: tipo as 'admin' | 'organizador' | 'convidado',
      telefone,
    };
  }
}
