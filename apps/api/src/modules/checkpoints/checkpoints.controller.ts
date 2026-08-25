import { Controller, Get, Param, Post, Body } from "@nestjs/common";
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
  get(@Param("id") id: string, @CurrentUser() user: AuthUser) {
    return this.checkpoints.getById(id, user.userId);
  }

  @Post(":id/submit")
  submit(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(SubmitCheckpointGateSchema)) body: unknown,
  ) {
    return this.checkpoints.submit(id, user.userId, body as never);
  }
}
