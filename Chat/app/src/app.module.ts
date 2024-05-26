import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    WhatsappModule,
    MongooseModule.forRoot('mongodb://localhost:27017/chat'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
