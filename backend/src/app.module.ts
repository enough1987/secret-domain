import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { PrismaService } from './services/prisma.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, RedisService],
})
export class AppModule {}
