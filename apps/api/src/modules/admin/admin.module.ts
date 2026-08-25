import { Module } from "@nestjs/common";
import { CategoriesModule } from "../categories/categories.module";
import { LessonsModule } from "../lessons/lessons.module";
import { QuizzesModule } from "../quizzes/quizzes.module";
import { AdminController } from "./admin.controller";

@Module({
  imports: [LessonsModule, QuizzesModule, CategoriesModule],
  controllers: [AdminController],
})
export class AdminModule {}
