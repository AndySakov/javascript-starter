import { Injectable, Dependencies } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
@Dependencies(PrismaService)
export class CityService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createCity(name, latitude, longitude) {
    return this.prisma.city.create({
      data: {
        name: name,
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    });
  }

  async updateCity(id, name, latitude, longitude) {
    return this.prisma.city.update({
      data: {
        name: name,
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      where: {
        id: id,
      },
    });
  }

  async deleteCity(id) {
    return this.prisma.city.delete({
      where: {
        id: id,
      },
    });
  }
}
