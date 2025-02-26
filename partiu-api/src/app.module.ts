import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventosModule } from './eventos/eventos.module';
import { ScraperController } from './scrapping/scraper.controller';
import { ScraperService } from './scrapping/scraper.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGO_URI as string),
    ...(process.env.MONGO_URI ? [MongooseModule.forRoot(process.env.MONGO_URI)] : []),
    // EventosModule,
  ],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperService],
})
export class AppModule {}
