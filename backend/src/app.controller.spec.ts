import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PhotoService } from './services/photo.service';
import { TodoService } from './services/todo.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [TodoService, PhotoService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getTodos()).toBe([]);
    });
  });
});
