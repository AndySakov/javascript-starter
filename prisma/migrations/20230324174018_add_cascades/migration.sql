-- DropForeignKey
ALTER TABLE "temperatures" DROP CONSTRAINT "temperatures_city_id_fkey";

-- DropForeignKey
ALTER TABLE "webhooks" DROP CONSTRAINT "webhooks_city_id_fkey";

-- AddForeignKey
ALTER TABLE "temperatures" ADD CONSTRAINT "temperatures_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhooks" ADD CONSTRAINT "webhooks_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
