import { Controller, Get, Param, Post, Body, Headers } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SubmitCheckpointGateSchema } from "@muscle-mind/types";
import { AuthUser, CurrentUser } from "../../common/decorators";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";
import { CheckpointsService } from "./checkpoints.service";

@ApiTags("checkpoint-gates")
@ApiBearerAuth()
@Controller("checkpoint-gates")
export class CheckpointsController {
  constructor(private readonly checkpoints: CheckpointsService) {}

  @Get(":id")
  get(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Headers("x-locale") locale?: string,
  ) {
    return this.checkpoints.getById(id, user.userId, locale);
  }

  @Post(":id/submit")
  submit(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(SubmitCheckpointGateSchema)) body: unknown,
    @Headers("x-locale") locale?: string,
  ) {
    return this.checkpoints.submit(id, user.userId, body as never, locale);
  }
}
