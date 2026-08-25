import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SubmitQuizSchema } from "@muscle-mind/types";
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
  ) {
    return this.quizzes.getByLessonId(lessonId, user.userId);
  }

  @Post(":id/submit")
  submit(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(SubmitQuizSchema)) body: unknown,
  ) {
    return this.quizzes.submit(id, user.userId, body as never);
  }
}
