import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './services/app.service';
import { Todo, Photo } from '../generated/prisma';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async root() {
    const isConnected = await this.appService.isDbConnected();
    return {
      status: isConnected ? 'ok' : 'error',
      db: isConnected,
      version: process.env.npm_package_version || 'unknown',
    };
  }

  @Get('todos')
  async getTodos(): Promise<Todo[] | { error: string; details: string }> {
    return this.appService.getTodos();
  }

  @Post('todos')
  async addTodo(
    @Body() todo: Omit<Todo, 'id' | 'created'>,
  ): Promise<Todo | { error: string; details: string }> {
    return this.appService.addTodo(todo);
  }

  @Patch('todos/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() todo: Partial<Todo>,
  ): Promise<Todo | { error: string; details: string }> {
    return this.appService.updateTodo({ ...todo, id });
  }

  @Delete('todos/:id')
  async deleteTodo(
    @Param('id') id: string,
  ): Promise<{ id: string } | { error: string; details: string }> {
    return this.appService.deleteTodo(id);
  }

  @Get('photos')
  async getPhotos(): Promise<Photo[] | { error: string; details: string }> {
    return this.appService.getPhotos();
  }
}
