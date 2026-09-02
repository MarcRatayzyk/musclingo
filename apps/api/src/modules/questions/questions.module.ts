import { Module } from "@nestjs/common";
import { QuestionPoolService } from "./question-pool.service";

@Module({
  providers: [QuestionPoolService],
  exports: [QuestionPoolService],
})
export class QuestionsModule {}
