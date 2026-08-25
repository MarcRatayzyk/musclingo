import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  SubmitMemoryGameScoreSchema,
  UpdatePreferredCategorySchema,
} from "@muscle-mind/types";
import { CurrentUser, AuthUser } from "../../common/decorators";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";
import { UsersService } from "./users.service";

@ApiTags("users")
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get("me")
  me(@CurrentUser() user: AuthUser) {
    return this.users.getMe(user.userId);
  }

  @Patch("me/preferred-category")
  updatePreferredCategory(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(UpdatePreferredCategorySchema)) body: unknown,
  ) {
    const { preferredCategoryId } = body as { preferredCategoryId: string };
    return this.users.updatePreferredCategory(
      user.userId,
      preferredCategoryId,
    );
  }

  @Post("me/memory-game/score")
  submitMemoryGameScore(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(SubmitMemoryGameScoreSchema)) body: unknown,
  ) {
    const { score } = body as { score: number };
    return this.users.submitMemoryGameScore(user.userId, score);
  }
}
