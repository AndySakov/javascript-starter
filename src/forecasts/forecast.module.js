import { Module } from "@nestjs/common";
import { ForecastController } from "./forecast.controller";
import { ForecastService } from "./forecast.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [],
  controllers: [ForecastController],
  providers: [ForecastService, PrismaService],
})
export class ForecastModule {}
