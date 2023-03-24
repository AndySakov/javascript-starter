import { Injectable, Dependencies } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
@Dependencies(PrismaService)
export class TemperatureService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createTemperature(city_id, min, max) {
    const temp = await this.prisma.temperature.create({
      data: {
        min: Number(min),
        max: Number(max),
        city: {
          connect: { id: Number(city_id) },
        },
      },
    });
    const result = await this.prisma.city.findUnique({
      where: {
        id: Number(city_id),
      },
      select: {
        webhooks: {
          select: {
            callback_url: true,
          },
        },
      },
    });
    console.log(result);
    result.webhooks.forEach(webhook => {
      fetch(webhook.callback_url, {
        method: "POST",
        body: {
          city_id: temp.city_id,
          min: temp.min,
          max: temp.max,
          timestamp: Math.floor(new Date(temp.timestamp).getTime() / 1000),
        },
      });
    });
    return temp;
  }
}
