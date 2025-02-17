import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventoDocument = Evento & Document;

@Schema()
export class Evento {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao: string;

  @Prop({ type: Date })
  data: Date;

  @Prop()
  local: string;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
