import {
  Controller,
  Dependencies,
  Post,
  Patch,
  Param,
  Bind,
  Body,
  Delete,
} from "@nestjs/common";
import { TemperatureService } from "./temperature.service";

@Controller("temperatures")
@Dependencies(TemperatureService)
export class TemperatureController {
  constructor(temperatureService) {
    this.temperatureService = temperatureService;
  }

  @Post()
  @Bind(Body())
  async createTemperature(body) {
    try {
      const { city_id, min, max } = body;
      const result = await this.temperatureService.createTemperature(
        city_id,
        min,
        max,
      );

      return {
        ...result,
        timestamp: Math.floor(new Date(result.timestamp).getTime() / 1000),
      };
    } catch (err) {
      return err.message;
    }
  }
}
