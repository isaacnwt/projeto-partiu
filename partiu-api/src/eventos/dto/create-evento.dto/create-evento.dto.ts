import { IsString, IsNotEmpty, IsOptional, IsDateString, ValidateNested, IsArray, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class LinkDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

class ContatoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;
}

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsNotEmpty()
  data: string; // DD/MM/AAAA

  @IsString()
  @IsNotEmpty()
  endereco: string; // TODO - especificar campos rua, número, CEP

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  @IsOptional()
  links?: LinkDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContatoDto)
  @IsOptional()
  contatos?: ContatoDto[];

  @IsMongoId()
  @IsNotEmpty()
  criadoPor: string;

  @IsOptional()
  fonteAutomatica?: boolean;
}
