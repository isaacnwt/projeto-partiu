import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventosModule } from './eventos/eventos.module';
import { ScraperController } from './scrapping/scraper.controller';
import { ScraperService } from './scrapping/scraper.service';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    EventosModule,
    UsuariosModule,
  ],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperService],
})
export class AppModule {}
