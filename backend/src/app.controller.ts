import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Todo, Photo } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  root() {
    return { status: 'ok' };
  }

  @Get('todos')
  getTodos(): Todo[] | { error: string; details: string } {
    return this.appService.getTodos();
  }

  @Post('todos')
  addTodo(
    @Body() todo: Omit<Todo, 'id' | 'created'>,
  ): Todo | { error: string; details: string } {
    return this.appService.addTodo(todo);
  }

  @Patch('todos/:id')
  updateTodo(
    @Param('id') id: string,
    @Body() todo: Partial<Todo>,
  ): Todo | { error: string; details: string } {
    return this.appService.updateTodo({ ...todo, id });
  }

  @Delete('todos/:id')
  deleteTodo(
    @Param('id') id: string,
  ): { id: string } | { error: string; details: string } {
    return this.appService.deleteTodo(id);
  }

  @Get('photos')
  getPhotos(): Photo[] | { error: string; details: string } {
    return this.appService.getPhotos();
  }
}
