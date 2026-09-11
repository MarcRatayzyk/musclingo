import { Controller, Get, Headers, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthUser, CurrentUser } from "../../common/decorators";
import { CategoriesService } from "./categories.service";

@ApiTags("categories")
@ApiBearerAuth()
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  list(@CurrentUser() user: AuthUser, @Headers("x-locale") locale?: string) {
    return this.categories.listForUser(user.userId, locale);
  }

  @Get("ongoing")
  ongoing(@CurrentUser() user: AuthUser, @Headers("x-locale") locale?: string) {
    return this.categories.listOngoing(user.userId, locale);
  }

  @Get(":id/path")
  path(
    @Param("id") id: string,
    @CurrentUser() user: AuthUser,
    @Headers("x-locale") locale?: string,
  ) {
    return this.categories.getPath(id, user.userId, locale);
  }
}
