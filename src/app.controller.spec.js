import { Test } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let app;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe("healthCheck", () => {
    it('should return "Server is healthy and up!"', () => {
      const appController = app.get(AppController);
      expect(appController.healthCheck()).toBe("Server is healthy and up!");
    });
  });
});
