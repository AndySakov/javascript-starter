import { Module } from "@nestjs/common";
import { TemperatureController } from "./temperature.controller";
import { TemperatureService } from "./temperature.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [],
  controllers: [TemperatureController],
  providers: [TemperatureService, PrismaService],
})
export class TemperatureModule {}
