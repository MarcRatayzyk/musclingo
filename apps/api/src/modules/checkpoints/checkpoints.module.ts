import { Module } from "@nestjs/common";
import { CategoriesModule } from "../categories/categories.module";
import { GamificationModule } from "../gamification/gamification.module";
import { CheckpointsController } from "./checkpoints.controller";
import { CheckpointsService } from "./checkpoints.service";

@Module({
  imports: [GamificationModule, CategoriesModule],
  controllers: [CheckpointsController],
  providers: [CheckpointsService],
  exports: [CheckpointsService],
})
export class CheckpointsModule {}
