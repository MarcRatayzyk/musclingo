import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  SubmitMemoryGameScoreSchema,
  UpdateLocaleSchema,
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
  me(
    @CurrentUser() user: AuthUser,
    @Headers("x-locale") localeHeader?: string,
  ) {
    return this.users.getMe(user.userId, localeHeader);
  }

  @Patch("me/locale")
  updateLocale(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(UpdateLocaleSchema)) body: unknown,
  ) {
    const { locale } = body as { locale: "fr" | "en" };
    return this.users.updateLocale(user.userId, locale);
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

  @Delete("me/preferred-category")
  clearPreferredCategory(@CurrentUser() user: AuthUser) {
    return this.users.clearPreferredCategory(user.userId);
  }

  @Post("me/memory-game/score")
  submitMemoryGameScore(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(SubmitMemoryGameScoreSchema)) body: unknown,
  ) {
    const { score } = body as { score: number };
    return this.users.submitMemoryGameScore(user.userId, score);
  }

  @Post("me/streak-goal/claim")
  claimStreakGoal(
    @CurrentUser() user: AuthUser,
    @Body() body: { days?: number },
  ) {
    const days = body?.days;
    if (days !== 7 && days !== 20 && days !== 50) {
      throw new BadRequestException("Objectif invalide");
    }
    return this.users.claimStreakGoal(user.userId, days);
  }
}
