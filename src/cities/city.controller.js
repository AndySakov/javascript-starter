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
import { CityService } from "./city.service";

@Controller("cities")
@Dependencies(CityService)
export class CityController {
  constructor(cityService) {
    this.cityService = cityService;
  }

  @Post()
  @Bind(Body())
  async createCity(body) {
    try {
      const { name, latitude, longitude } = body;
      return this.cityService.createCity(name, latitude, longitude);
    } catch (err) {
      return err.message;
    }
  }

  @Patch(":id")
  @Bind(Body(), Param("id"))
  async updateCity(body, id) {
    try {
      const { name, latitude, longitude } = body;
      return this.cityService.updateCity(id, name, latitude, longitude);
    } catch (err) {
      return err.message;
    }
  }

  @Delete(":id")
  @Bind(Param("id"))
  async deleteCity(id) {
    try {
      return this.cityService.deleteCity(id);
    } catch (err) {
      return err.message;
    }
  }
}
