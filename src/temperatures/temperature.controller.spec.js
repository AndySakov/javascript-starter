import { Test } from "@nestjs/testing";
import { TemperatureController } from "./temperature.controller";
import { TemperatureService } from "./temperature.service";

describe("TemperatureController", () => {
  let app;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TemperatureController],
      providers: [TemperatureService],
    }).compile();
  });

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      const temperatureController = app.get(TemperatureController);
      expect(temperatureController.getHello()).toBe("Hello World!");
    });
  });
});
