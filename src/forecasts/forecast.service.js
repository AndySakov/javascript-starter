import { Injectable, Dependencies } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
@Dependencies(PrismaService)
export class ForecastService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getForecast(city_id) {
    return this.prisma.city.findUnique({
      where: {
        id: Number(city_id),
      },
      select: {
        temperatures: {
          where: {
            timestamp: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // timestamp is within the last 24 hours
            },
          },
          select: {
            min: true,
            max: true,
          },
        },
        _count: {
          select: {
            temperatures: true,
          },
        },
      },
    });
  }
}
