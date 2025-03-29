import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './usuario.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async criar(dados: Partial<Usuario>) {
    const senhaCriptografada = await bcrypt.hash(dados.senha as string, 10);
    const novoUsuario = new this.usuarioModel({
      ...dados,
      senha: senhaCriptografada,
    });
    return novoUsuario.save();
  }

  async listar() {
    const usuarios = await this.usuarioModel.find().select('-senha').exec();
    return usuarios;
  }
  
}
