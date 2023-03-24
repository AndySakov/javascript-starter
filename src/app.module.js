import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CityModule } from "./cities/city.module";
import { ForecastModule } from "./forecasts/forecast.module";
import { PrismaService } from "./prisma/prisma.service";
import { TemperatureModule } from "./temperatures/temperature.module";
import { WebhookModule } from "./webhooks/webhook.module";

@Module({
  imports: [CityModule, TemperatureModule, ForecastModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
