import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async criar(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.criar(dto);
  }

  @Get()
  async listar() {
    return this.usuariosService.listar();
  }
}
