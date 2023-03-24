import { Test } from "@nestjs/testing";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";

describe("CityController", () => {
  let app;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService],
    }).compile();
  });

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      const cityController = app.get(CityController);
      expect(cityController.getHello()).toBe("Hello World!");
    });
  });
});
