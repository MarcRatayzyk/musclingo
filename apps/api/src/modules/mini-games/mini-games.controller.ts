import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SubmitMiniGameResultSchema } from "@muscle-mind/types";
import { AuthUser, CurrentUser } from "../../common/decorators";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";
import { MiniGamesService } from "./mini-games.service";

@ApiTags("mini-games")
@ApiBearerAuth()
@Controller("mini-games")
export class MiniGamesController {
  constructor(private readonly miniGames: MiniGamesService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.miniGames.list(user.userId);
  }

  @Get(":categoryId/questions")
  questions(
    @Param("categoryId") categoryId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.miniGames.getQuestions(categoryId, user.userId);
  }

  @Post(":categoryId/results")
  submit(
    @Param("categoryId") categoryId: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(SubmitMiniGameResultSchema)) body: unknown,
  ) {
    return this.miniGames.submitResult(categoryId, user.userId, body as never);
  }
}
