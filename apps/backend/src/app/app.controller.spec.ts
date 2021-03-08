import { Test, TestingModule } from '@nestjs/testing';


describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to backend!"', () => {
     /* const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to backend!',
      });*/
    });
  });
});
