import { Test } from "@nestjs/testing";
import { CityController } from "../cities/city.controller";
import { CityService } from "../cities/city.service";
import { PrismaService } from "../prisma/prisma.service";
import { TemperatureController } from "../temperatures/temperature.controller";
import { TemperatureService } from "../temperatures/temperature.service";
import { ForecastController } from "./forecast.controller";
import { ForecastService } from "./forecast.service";

describe("ForecastController", () => {
  let forecastController;
  let cityController;
  let tempController;

  let city_id;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ForecastController, CityController, TemperatureController],
      providers: [
        ForecastService,
        CityService,
        TemperatureService,
        PrismaService,
      ],
    }).compile();

    forecastController = moduleRef.get(ForecastController);
    cityController = moduleRef.get(CityController);
    tempController = moduleRef.get(TemperatureController);
  });

  describe("getForecast", () => {
    it("should get a forecast for a city", async () => {
      const city = await cityController.createCity({
        name: "Warsaw",
        latitude: 90.92392,
        longitude: 50.83434,
      });
      city_id = city.id;
      await tempController.createTemperature({
        city_id: city.id,
        min: 32,
        max: 35,
      });
      await tempController.createTemperature({
        city_id: city.id,
        min: 36,
        max: 39,
      });

      const forecast = await forecastController.getForecast(city_id);
      expect(forecast.city_id).toBe(city_id);
      expect(forecast.min).toBe(34);
      expect(forecast.max).toBe(37);
      expect(forecast.sample).toBe(2);
    });
  });

  afterEach(async () => {
    await cityController.deleteCity(city_id);
  });
});
