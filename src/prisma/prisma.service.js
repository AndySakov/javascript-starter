import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
