import { Injectable } from '@nestjs/common';
import { Todo, Photo } from '../../generated/prisma';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  // Helper to generate cache key based on limit
  private getTodosCacheKey(limit?: string): string {
    return limit ? `todos:all:limit=${limit}` : 'todos:all';
  }

  // Get all todos
  async getTodos(
    limit?: string,
  ): Promise<Todo[] | { error: string; details: string }> {
    const parsedLimit = limit ? Number(limit) : undefined;
    const cacheKey = this.getTodosCacheKey(limit);
    const cached = await this.redisService.getCache(cacheKey);
    if (cached) return JSON.parse(cached) as Todo[];

    try {
      const todos = await this.prisma.todo.findMany({
        orderBy: { created: 'desc' },
        ...(limit ? { take: Number(parsedLimit) } : {}),
      });
      await this.redisService.setCache(cacheKey, JSON.stringify(todos));
      return todos;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not read todos', details: message };
    }
  }

  // Invalidate all todos cache keys
  private async invalidateTodosCache() {
    const keys = await this.redisService.getKeys('todos:all*');
    for (const key of keys) {
      await this.redisService.delCache(key);
    }
  }

  // Add a new todo
  async addTodo(
    todo: Omit<Todo, 'id' | 'created'>,
  ): Promise<Todo | { error: string; details: string }> {
    try {
      const newTodo = await this.prisma.todo.create({
        data: {
          ...todo,
          created: new Date(),
        },
      });
      await this.invalidateTodosCache(); // Invalidate all relevant cache keys
      return newTodo;
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
      const newtodo = await this.prisma.todo.update({
        where: { id: todo.id },
        data: { ...todo },
      });
      await this.invalidateTodosCache();
      return newtodo;
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
      await this.invalidateTodosCache();
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
