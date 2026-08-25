import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompleteLessonSchema } from "@muscle-mind/types";
import { AuthUser, CurrentUser } from "../../common/decorators";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";
import { LessonsService } from "./lessons.service";

@ApiTags("lessons")
@ApiBearerAuth()
@Controller("lessons")
export class LessonsController {
  constructor(private readonly lessons: LessonsService) {}

  @Get("recommended")
  recommend(@CurrentUser() user: AuthUser) {
    return this.lessons.recommend(user.userId);
  }

  @Get(":id")
  get(@Param("id") id: string, @CurrentUser() user: AuthUser) {
    return this.lessons.getById(id, user.userId);
  }

  @Post(":id/complete")
  complete(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(CompleteLessonSchema)) body: unknown,
  ) {
    return this.lessons.complete(id, user.userId, body as never);
  }
}
