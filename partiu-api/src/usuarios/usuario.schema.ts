import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ enum: ['admin', 'organizador', 'convidado'], default: 'convidado' })
  tipo: string;

  @Prop()
  telefone?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
