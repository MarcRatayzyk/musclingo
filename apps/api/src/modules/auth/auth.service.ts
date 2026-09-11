import {

  BadRequestException,

  ConflictException,

  Injectable,

  UnauthorizedException,

} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

import { LoginInput, RegisterInput } from "@muscle-mind/types";

import { PrismaService } from "../../prisma/prisma.service";

import { RedisService } from "../../redis/redis.service";

import { randomUUID } from "crypto";



@Injectable()

export class AuthService {

  constructor(

    private readonly prisma: PrismaService,

    private readonly jwt: JwtService,

    private readonly redis: RedisService,

  ) {}



  async register(input: RegisterInput) {

    const existing = await this.prisma.user.findUnique({

      where: { email: input.email.toLowerCase() },

    });

    if (existing) {

      throw new ConflictException("Email already registered");

    }



    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await this.prisma.user.create({

      data: {

        email: input.email.toLowerCase(),

        passwordHash,

        displayName: input.displayName,

        isGuest: false,

        streak: { create: {} },

      },

    });



    return this.issueTokens(user.id, user.email, user.role);

  }



  async createGuest() {

    const user = await this.prisma.user.create({

      data: {

        displayName: "Athlète",

        isGuest: true,

        streak: { create: {} },

      },

    });



    return this.issueTokens(user.id, user.email, user.role);

  }



  /**

   * Upgrade a guest session into a full account (keeps progress).

   */

  async claim(userId: string, input: RegisterInput) {

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {

      throw new UnauthorizedException("Invalid session");

    }

    if (!user.isGuest) {

      throw new BadRequestException("Account already claimed");

    }



    const email = input.email.toLowerCase();

    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing) {

      throw new ConflictException("Email already registered");

    }



    const passwordHash = await bcrypt.hash(input.password, 10);

    const updated = await this.prisma.user.update({

      where: { id: userId },

      data: {

        email,

        passwordHash,

        displayName: input.displayName,

        isGuest: false,

      },

    });



    return this.issueTokens(updated.id, updated.email, updated.role);

  }



  async login(input: LoginInput) {

    const user = await this.prisma.user.findUnique({

      where: { email: input.email.toLowerCase() },

    });

    if (!user || !user.passwordHash) {

      throw new UnauthorizedException("Invalid credentials");

    }



    const ok = await bcrypt.compare(input.password, user.passwordHash);

    if (!ok) {

      throw new UnauthorizedException("Invalid credentials");

    }



    return this.issueTokens(user.id, user.email, user.role);

  }



  async refresh(refreshToken: string) {

    try {

      const payload = await this.jwt.verifyAsync<{

        sub: string;

        email: string;

        role: "USER" | "ADMIN";

        jti: string;

        typ: string;

      }>(refreshToken, {

        secret: this.refreshSecret(),

      });



      if (payload.typ !== "refresh") {

        throw new UnauthorizedException("Invalid token type");

      }



      const stored = await this.redis.get(`refresh:${payload.sub}:${payload.jti}`);

      if (!stored) {

        throw new UnauthorizedException("Refresh token revoked");

      }



      await this.redis.del(`refresh:${payload.sub}:${payload.jti}`);



      const user = await this.prisma.user.findUnique({

        where: { id: payload.sub },

        select: { id: true, email: true, role: true },

      });

      if (!user) {

        throw new UnauthorizedException("Invalid refresh token");

      }



      return this.issueTokens(user.id, user.email, user.role);

    } catch (err) {

      if (err instanceof UnauthorizedException) throw err;

      throw new UnauthorizedException("Invalid refresh token");

    }

  }



  /** OAuth stubs — wired in a later phase. */

  appleOAuth() {

    return { statusCode: 501, message: "Apple OAuth not implemented yet" };

  }



  googleOAuth() {

    return { statusCode: 501, message: "Google OAuth not implemented yet" };

  }



  private accessSecret(): string {

    const secret = process.env.JWT_ACCESS_SECRET?.trim();

    if (!secret || secret.length < 32) {

      throw new Error(

        "JWT_ACCESS_SECRET is required (min 32 characters) — no fallback",

      );

    }

    return secret;

  }



  private refreshSecret(): string {

    const secret = process.env.JWT_REFRESH_SECRET?.trim();

    if (!secret || secret.length < 32) {

      throw new Error(

        "JWT_REFRESH_SECRET is required (min 32 characters) — no fallback",

      );

    }

    return secret;

  }



  private async issueTokens(

    userId: string,

    email: string | null,

    role: "USER" | "ADMIN",

  ) {

    const jti = randomUUID();

    const emailClaim = email ?? "";

    const accessToken = await this.jwt.signAsync(

      { sub: userId, email: emailClaim, role },

      {

        secret: this.accessSecret(),

        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",

      },

    );



    const refreshToken = await this.jwt.signAsync(

      { sub: userId, email: emailClaim, role, jti, typ: "refresh" },

      {

        secret: this.refreshSecret(),

        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",

      },

    );



    await this.redis.set(`refresh:${userId}:${jti}`, "1", 60 * 60 * 24 * 7);



    return {

      accessToken,

      refreshToken,

      tokenType: "Bearer" as const,

      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",

    };

  }

}

