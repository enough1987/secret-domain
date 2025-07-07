import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DbJson, Todo, Photo } from './models';
import { v4 as uuidv4 } from 'uuid';

const dbPath = join(process.cwd(), 'db.json');

@Injectable()
export class AppService {
  private readDb(): DbJson {
    const data = readFileSync(dbPath, 'utf-8');
    return JSON.parse(data) as DbJson;
  }

  private writeDb(db: DbJson) {
    writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
  }

  getTodos(): Todo[] | { error: string; details: string } {
    try {
      const db = this.readDb();
      return db.todos || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not read todos', details: message };
    }
  }

  addTodo(
    todo: Omit<Todo, 'id' | 'created'>,
  ): Todo | { error: string; details: string } {
    try {
      const db = this.readDb();
      const newTodo: Todo = {
        ...todo,
        id: uuidv4(),
        created: new Date().toISOString(),
      };
      db.todos.push(newTodo);
      this.writeDb(db);
      return newTodo;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not add todo', details: message };
    }
  }

  updateTodo(
    todo: Partial<Todo> & Pick<Todo, 'id'>,
  ): Todo | { error: string; details: string } {
    try {
      const db = this.readDb();
      const idx = db.todos.findIndex((t) => t.id === todo.id);
      if (idx === -1)
        return { error: 'Todo not found', details: `id: ${todo.id}` };
      db.todos[idx] = { ...db.todos[idx], ...todo };
      this.writeDb(db);
      return db.todos[idx];
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not update todo', details: message };
    }
  }

  deleteTodo(id: string): { id: string } | { error: string; details: string } {
    try {
      const db = this.readDb();
      const idx = db.todos.findIndex((t) => t.id === id);
      if (idx === -1) return { error: 'Todo not found', details: `id: ${id}` };
      db.todos.splice(idx, 1);
      this.writeDb(db);
      return { id };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not delete todo', details: message };
    }
  }

  getPhotos(): Photo[] | { error: string; details: string } {
    try {
      const db = this.readDb();
      return db.photos || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: 'Could not read photos', details: message };
    }
  }
}
