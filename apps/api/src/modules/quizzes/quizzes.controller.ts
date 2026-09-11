import { Body, Controller, Get, Headers, Param, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  CheckQuizAnswerSchema,
  SubmitQuizSchema,
  UseQuizHintSchema,
} from "@muscle-mind/types";
import { AuthUser, CurrentUser } from "../../common/decorators";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";
import { QuizzesService } from "./quizzes.service";

@ApiTags("quizzes")
@ApiBearerAuth()
@Controller("quizzes")
export class QuizzesController {
  constructor(private readonly quizzes: QuizzesService) {}

  @Get("by-lesson/:lessonId")
  byLesson(
    @Param("lessonId") lessonId: string,
    @CurrentUser() user: AuthUser,
    @Query("useExtraTime") useExtraTime?: string,
    @Headers("x-locale") locale?: string,
  ) {
    const boost =
      useExtraTime === "1" ||
      useExtraTime === "true" ||
      useExtraTime === "yes";
    return this.quizzes.getByLessonId(lessonId, user.userId, boost, locale);
  }

  @Post(":id/check-answer")
  checkAnswer(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(CheckQuizAnswerSchema)) body: unknown,
  ) {
    return this.quizzes.checkAnswer(id, user.userId, body as never);
  }

  @Post(":id/hint")
  useHint(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(UseQuizHintSchema)) body: unknown,
  ) {
    return this.quizzes.useHint(id, user.userId, body as never);
  }

  @Post(":id/submit")
  submit(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(SubmitQuizSchema)) body: unknown,
    @Headers("x-locale") locale?: string,
  ) {
    return this.quizzes.submit(id, user.userId, body as never, locale);
  }
}
