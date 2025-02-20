import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventoDocument = Evento & Document;

class Link {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  url: string;
}

class Contato {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  telefone?: string;
}

@Schema()
export class Evento {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao?: string;

  @Prop({ required: true, type: Date })
  data: Date;

  @Prop({ required: true })
  endereco: string; // TODO - especificar campos rua, número, CEP

  @Prop({ type: [Link], default: [] })
  links?: Link[];

  @Prop({ type: [Contato], default: [] })
  contatos?: Contato[];
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
