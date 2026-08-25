import { Module } from "@nestjs/common";
import { GamificationModule } from "../gamification/gamification.module";
import { MiniGamesController } from "./mini-games.controller";
import { MiniGamesService } from "./mini-games.service";

@Module({
  imports: [GamificationModule],
  controllers: [MiniGamesController],
  providers: [MiniGamesService],
  exports: [MiniGamesService],
})
export class MiniGamesModule {}
