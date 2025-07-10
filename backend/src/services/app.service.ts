import { Injectable } from '@nestjs/common';
import { Todo, Photo } from '../../generated/prisma';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  // Check DB connection
  async isDbConnected(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  // Get all todos
  async getTodos(): Promise<Todo[] | { error: string; details: string }> {
    try {
      return await this.prisma.todo.findMany({ orderBy: { created: 'desc' } });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not read todos', details: message };
    }
  }

  // Add a new todo
  async addTodo(
    todo: Omit<Todo, 'id' | 'created'>,
  ): Promise<Todo | { error: string; details: string }> {
    try {
      return await this.prisma.todo.create({
        data: {
          ...todo,
          created: new Date(),
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not add todo', details: message };
    }
  }

  // Update a todo
  async updateTodo(
    todo: Partial<Todo> & Pick<Todo, 'id'>,
  ): Promise<Todo | { error: string; details: string }> {
    try {
      return await this.prisma.todo.update({
        where: { id: todo.id },
        data: { ...todo },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not update todo', details: message };
    }
  }

  // Delete a todo
  async deleteTodo(
    id: string,
  ): Promise<{ id: string } | { error: string; details: string }> {
    try {
      await this.prisma.todo.delete({ where: { id } });
      return { id };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not delete todo', details: message };
    }
  }

  // Get all photos
  async getPhotos(): Promise<Photo[] | { error: string; details: string }> {
    try {
      return await this.prisma.photo.findMany();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not read photos', details: message };
    }
  }
}
