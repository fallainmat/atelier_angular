import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get(AppController) as AppController;
  });

  describe('root', () => {
    it('should return health response', () => {
      expect(appController.health).toBe('This is not the service you are looking for');
    });
  });
});
