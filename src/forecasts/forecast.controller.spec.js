import { Test } from "@nestjs/testing";
import { ForecastController } from "./forecast.controller";
import { ForecastService } from "./forecast.service";

describe("ForecastController", () => {
  let app;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ForecastController],
      providers: [ForecastService],
    }).compile();
  });

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      const forecastController = app.get(ForecastController);
      expect(forecastController.getHello()).toBe("Hello World!");
    });
  });
});
