import { Test } from "@nestjs/testing";
import { CityController } from "../cities/city.controller";
import { CityService } from "../cities/city.service";
import { PrismaService } from "../prisma/prisma.service";
import { WebhookController } from "./webhook.controller";
import { WebhookService } from "./webhook.service";

describe("WebhookController", () => {
  let webhookController;
  let cityController;
  let webhook_id;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WebhookController, CityController],
      providers: [WebhookService, CityService, PrismaService],
    }).compile();

    webhookController = moduleRef.get(WebhookController);
    cityController = moduleRef.get(CityController);
  });

  describe("createWebhook", () => {
    it("should create a webhook", async () => {
      const city = await cityController.createCity({
        name: "Warsaw",
        latitude: 90.92392,
        longitude: 50.83434,
      });
      const webhook = await webhookController.createWebhook({
        city_id: city.id,
        callback_url: "https://my.service.com/high-temperature",
      });
      webhook_id = webhook.id;
      expect(webhook).toHaveProperty("id");
      expect(webhook.city_id).not.toBe(undefined);
    });
  });

  describe("deleteWebhook", () => {
    it("should delete a webhook", async () => {
      const response = await webhookController.deleteWebhook(webhook_id);
      expect(response).toHaveProperty("id");
      expect(response.city_id).not.toBe(undefined);
      await cityController.deleteCity(response.city_id);
    });
  });
});
