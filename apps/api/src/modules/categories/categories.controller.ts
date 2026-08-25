import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthUser, CurrentUser } from "../../common/decorators";
import { CategoriesService } from "./categories.service";

@ApiTags("categories")
@ApiBearerAuth()
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.categories.listForUser(user.userId);
  }

  @Get("ongoing")
  ongoing(@CurrentUser() user: AuthUser) {
    return this.categories.listOngoing(user.userId);
  }

  @Get(":id/path")
  path(@Param("id") id: string, @CurrentUser() user: AuthUser) {
    return this.categories.getPath(id, user.userId);
  }
}
