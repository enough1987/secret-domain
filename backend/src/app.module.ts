import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './services/prisma.service';
import { RedisService } from './services/redis.service';
import { TodoService } from './services/todo.service';
import { PhotoService } from './services/photo.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TodoService, PhotoService, PrismaService, RedisService],
})
export class AppModule {}
