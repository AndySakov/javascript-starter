import { Injectable, Dependencies } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
@Dependencies(PrismaService)
export class WebhookService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createWebhook(city_id, callback_url) {
    return this.prisma.webhook.create({
      data: {
        callback_url: callback_url,
        city: {
          connect: { id: Number(city_id) },
        },
      },
    });
  }

  async deleteWebhook(id) {
    return this.prisma.webhook.delete({
      where: {
        id: id,
      },
    });
  }
}
