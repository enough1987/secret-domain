import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Todo, Photo } from '../generated/prisma';
import { PrismaService } from './services/prisma.service';
import { RedisService } from './services/redis.service';
import { TodoService } from './services/todo.service';
import { PhotoService } from './services/photo.service';

@Controller()
export class AppController {
  constructor(
    private readonly todoService: TodoService,
    private readonly photoService: PhotoService,
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get('/')
  async root() {
    const isDbConnected = await this.prisma.isDbConnected();
    const redis = this.redis.getClient();
    return {
      status: isDbConnected ? 'ok' : 'error',
      db: isDbConnected,
      cache: !!redis,
      version: process.env.npm_package_version || 'unknown',
    };
  }

  @Get('todos')
  async getTodos(@Query('limit') limit?: string) {
    return this.todoService.getTodos(limit);
  }

  @Post('todos')
  async addTodo(
    @Body() todo: Omit<Todo, 'id' | 'created'>,
  ): Promise<Todo | { error: string; details: string }> {
    return this.todoService.addTodo(todo);
  }

  @Patch('todos/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() todo: Partial<Todo>,
  ): Promise<Todo | { error: string; details: string }> {
    return this.todoService.updateTodo({ ...todo, id });
  }

  @Delete('todos/:id')
  async deleteTodo(
    @Param('id') id: string,
  ): Promise<{ id: string } | { error: string; details: string }> {
    return this.todoService.deleteTodo(id);
  }

  @Get('photos')
  async getPhotos(): Promise<Photo[] | { error: string; details: string }> {
    const photos = (await this.photoService.getPhotos()) as Photo[];
    if (photos?.length === 0) {
      await this.photoService.seedPhotos();
      return this.photoService.getPhotos();
    }
    return photos;
  }
}
