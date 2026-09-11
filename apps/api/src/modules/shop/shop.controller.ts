import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { AuthUser, CurrentUser } from "../../common/decorators";
import { resolveRequestLocale } from "../../common/locale";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";
import { ShopService } from "./shop.service";

const PurchaseSchema = z.object({
  offerId: z.string().min(1),
});

@ApiTags("shop")
@ApiBearerAuth()
@Controller("shop")
export class ShopController {
  constructor(private readonly shop: ShopService) {}

  @Get("catalog")
  catalog(
    @CurrentUser() user: AuthUser,
    @Headers("x-locale") localeHeader?: string,
  ) {
    return this.shop.getCatalog(
      resolveRequestLocale({ "x-locale": localeHeader }, user.locale),
    );
  }

  @Post("purchase")
  purchase(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(PurchaseSchema)) body: unknown,
  ) {
    const { offerId } = body as z.infer<typeof PurchaseSchema>;
    return this.shop.purchase(user.userId, offerId);
  }
}
