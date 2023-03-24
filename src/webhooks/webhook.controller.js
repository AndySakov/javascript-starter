import {
  Controller,
  Dependencies,
  Post,
  Param,
  Bind,
  Body,
  Delete,
} from "@nestjs/common";
import { WebhookService } from "./webhook.service";

@Controller("webhooks")
@Dependencies(WebhookService)
export class WebhookController {
  constructor(webhookService) {
    this.webhookService = webhookService;
  }

  @Post()
  @Bind(Body())
  async createWebhook(body) {
    try {
      const { city_id, callback_url } = body;
      return this.webhookService.createWebhook(city_id, callback_url);
    } catch (err) {
      return err.message;
    }
  }

  @Delete(":id")
  @Bind(Param("id"))
  async deleteWebhook(id) {
    try {
      return this.webhookService.deleteWebhook(id);
    } catch (err) {
      return err.message;
    }
  }
}
