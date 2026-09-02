import { Module } from "@nestjs/common";
import { CategoriesModule } from "../categories/categories.module";
import { GamificationModule } from "../gamification/gamification.module";
import { QuestionsModule } from "../questions/questions.module";
import { QuizzesController } from "./quizzes.controller";
import { QuizzesService } from "./quizzes.service";

@Module({
  imports: [GamificationModule, CategoriesModule, QuestionsModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService],
})
export class QuizzesModule {}
