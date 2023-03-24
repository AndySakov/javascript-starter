import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  healthCheck() {
    return "Server is healthy and up!";
  }
}
