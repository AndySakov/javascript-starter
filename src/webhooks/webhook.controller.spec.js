import { Test } from "@nestjs/testing";
import { WebhookController } from "./webhook.controller";
import { WebhookService } from "./webhook.service";

describe("WebhookController", () => {
  let app;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [WebhookService],
    }).compile();
  });

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      const webhookController = app.get(WebhookController);
      expect(webhookController.getHello()).toBe("Hello World!");
    });
  });
});
