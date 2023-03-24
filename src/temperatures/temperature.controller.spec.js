import { Test } from "@nestjs/testing";
import { CityController } from "../cities/city.controller";
import { CityService } from "../cities/city.service";
import { PrismaService } from "../prisma/prisma.service";
import { TemperatureController } from "./temperature.controller";
import { TemperatureService } from "./temperature.service";

describe("TemperatureController", () => {
  let tempController;
  let cityController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TemperatureController, CityController],
      providers: [TemperatureService, CityService, PrismaService],
    }).compile();

    tempController = moduleRef.get(TemperatureController);
    cityController = moduleRef.get(CityController);
  });

  describe("createTemperature", () => {
    it("should create a temperature", async () => {
      const city = await cityController.createCity({
        name: "Warsaw",
        latitude: 90.92392,
        longitude: 50.83434,
      });
      const response = await tempController.createTemperature({
        city_id: city.id,
        min: 39,
        max: 50,
      });
      expect(response).toHaveProperty("id");
      expect(response.timestamp).not.toBe(undefined);
      await cityController.deleteCity(city.id);
    });
  });
});
