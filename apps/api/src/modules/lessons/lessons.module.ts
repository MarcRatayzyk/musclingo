import { Module } from "@nestjs/common";
import { CategoriesModule } from "../categories/categories.module";
import { GamificationModule } from "../gamification/gamification.module";
import { UsersModule } from "../users/users.module";
import { LessonsController } from "./lessons.controller";
import { LessonsService } from "./lessons.service";

@Module({
  imports: [GamificationModule, CategoriesModule, UsersModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
