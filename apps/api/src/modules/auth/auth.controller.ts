import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  LoginSchema,
  RefreshSchema,
  RegisterSchema,
} from "@muscle-mind/types";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";
import { Public } from "../../common/decorators";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post("register")
  register(@Body(new ZodValidationPipe(RegisterSchema)) body: unknown) {
    return this.auth.register(body as never);
  }

  @Public()
  @HttpCode(200)
  @Post("login")
  login(@Body(new ZodValidationPipe(LoginSchema)) body: unknown) {
    return this.auth.login(body as never);
  }

  @Public()
  @HttpCode(200)
  @Post("refresh")
  refresh(@Body(new ZodValidationPipe(RefreshSchema)) body: unknown) {
    const data = body as { refreshToken: string };
    return this.auth.refresh(data.refreshToken);
  }

  @Public()
  @Post("oauth/apple")
  apple() {
    return this.auth.appleOAuth();
  }

  @Public()
  @Post("oauth/google")
  google() {
    return this.auth.googleOAuth();
  }
}
