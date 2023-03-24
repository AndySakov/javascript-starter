import { Test } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";

describe("CityController", () => {
  let cityController;
  let city_id;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService, PrismaService],
    }).compile();

    cityController = moduleRef.get(CityController);
  });

  describe("createCity", () => {
    it("should create a city", async () => {
      const response = await cityController.createCity({
        name: "Warsaw",
        latitude: 90.92392,
        longitude: 50.83434,
      });
      city_id = response.id;
      expect(response).toHaveProperty("id");
      expect(response.name).toBe("Warsaw");
    });
  });

  describe("updateCity", () => {
    it("should update the city", async () => {
      const response = await cityController.updateCity(
        {
          name: "Krakow",
          latitude: 90.92392,
          longitude: 50.83434,
        },
        city_id,
      );
      city_id = response.id;
      expect(response).toHaveProperty("id");
      expect(response.id).toBe(city_id);
      expect(response.name).toBe("Krakow");
    });
  });

  describe("deleteCity", () => {
    it("should delete the city", async () => {
      const response = await cityController.deleteCity(city_id);
      expect(response).toHaveProperty("id");
      expect(response.id).toBe(city_id);
    });
  });
});
