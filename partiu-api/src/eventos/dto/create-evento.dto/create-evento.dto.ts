import { IsString, IsNotEmpty, IsOptional, IsDateString, ValidateNested, IsArray, IsMongoId, IsISO8601 } from 'class-validator';
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

  @IsISO8601() 
  @IsNotEmpty()
  data: string;

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
