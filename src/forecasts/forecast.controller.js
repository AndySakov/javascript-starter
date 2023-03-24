import { Controller, Dependencies, Param, Bind, Get } from "@nestjs/common";
import { ForecastService } from "./forecast.service";

@Controller("forecasts")
@Dependencies(ForecastService)
export class ForecastController {
  constructor(forecastService) {
    this.forecastService = forecastService;
  }

  @Get(":city_id")
  @Bind(Param("city_id"))
  async getForecast(city_id) {
    try {
      const result = await this.forecastService.getForecast(city_id);
      const reducer = key => (acc, value, index, array) => {
        let val = acc + value[key];
        if (index === array.length - 1) {
          return val / array.length;
        }
        return val;
      };
      return {
        city_id,
        min: result.temperatures.reduce(reducer("min"), 0),
        max: result.temperatures.reduce(reducer("max"), 0),
        sample: result._count.temperatures,
      };
    } catch (err) {
      return err.message;
    }
  }
}
