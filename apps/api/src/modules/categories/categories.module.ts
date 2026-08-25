import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { PathService } from "./path.service";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PathService],
  exports: [CategoriesService, PathService],
})
export class CategoriesModule {}
