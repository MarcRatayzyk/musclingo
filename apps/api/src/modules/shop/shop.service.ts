import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { AppLocale } from "../../common/locale";
import { UsersService } from "../users/users.service";
import { getShopCatalog, getShopOffer } from "./shop.catalog";

@Injectable()
export class ShopService {
  constructor(private readonly users: UsersService) {}

  getCatalog(locale: AppLocale = "fr") {
    return { offers: getShopCatalog(locale) };
  }

  private demoPaymentsEnabled() {
    return process.env.DEMO_PAYMENTS === "true";
  }

  async purchase(userId: string, offerId: string) {
    const offer = getShopOffer(offerId);
    if (!offer) throw new NotFoundException("Offre introuvable");

    if (offer.kind === "coins") {
      const price = offer.priceNeuroCoins ?? 0;
      if (price <= 0) throw new BadRequestException("Offre invalide");
      await this.users.spendNeuroCoins(userId, price);
      const water = await this.users.addWaterBottles(
        userId,
        offer.rewardBottles,
      );
      const me = await this.users.getMe(userId);
      return {
        demo: false,
        offerId: offer.id,
        rewardBottles: offer.rewardBottles,
        neuroCoinBalance: me.neuroCoinBalance,
        waterBottles: water.waterBottles,
      };
    }

    if (!this.demoPaymentsEnabled()) {
      throw new ForbiddenException(
        "Paiements démo désactivés. Activez DEMO_PAYMENTS=true uniquement hors production réelle.",
      );
    }

    // Abonnement / argent fictif — aucun paiement réel (opt-in DEMO_PAYMENTS).
    const meBefore = await this.users.getMe(userId);
    let waterBottles = meBefore.waterBottles;
    if (offer.rewardBottles > 0) {
      const water = await this.users.addWaterBottles(
        userId,
        offer.rewardBottles,
      );
      waterBottles = water.waterBottles;
    }
    const me = await this.users.getMe(userId);
    const isSubscription = offer.id.startsWith("sub-");
    return {
      demo: true,
      offerId: offer.id,
      rewardBottles: offer.rewardBottles,
      neuroCoinBalance: me.neuroCoinBalance,
      waterBottles,
      message: isSubscription
        ? "Abonnement démo activé — aucun paiement réel."
        : "Achat démo : aucun paiement réel.",
    };
  }
}
